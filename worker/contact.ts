// Contact handler for POST /api/contact.
// Origin check, honeypot, best-effort rate limit, link filter, optional Turnstile,
// then Resend.
// Environment variables (Worker settings, not the repo):
//   RESEND_API_KEY, CONTACT_TO, CONTACT_FROM, TURNSTILE_SECRET_KEY (optional)

export interface ContactEnv {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  TURNSTILE_SECRET_KEY?: string;
}

const LIMITS = { name: 200, email: 320, message: 5000 };
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const MAX_LINKS = 2;
const LINK = /(https?:\/\/|www\.)/gi;
const LINK_MARKUP = /<a\s[^>]*href|\[url[=\]]/i;

// Best-effort only: one Map per Worker isolate. Not a durable rate limit.
const hits = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX;
}

function clean(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return value.replace(/[&<>"']/g, (char) => map[char] ?? char);
}

// Browsers send Origin on form posts, so another site's Origin means a forged post.
// A missing Origin is allowed: some privacy tools strip it.
function isCrossOrigin(request: Request): boolean {
  const origin = request.headers.get('Origin');
  return origin !== null && origin !== new URL(request.url).origin;
}

function looksLikeSpam(name: string, message: string): boolean {
  return (
    (name.match(LINK)?.length ?? 0) > 0 ||
    LINK_MARKUP.test(message) ||
    (message.match(LINK)?.length ?? 0) > MAX_LINKS
  );
}

function errorPage(message: string, status = 400): Response {
  return new Response(
    `<!doctype html><html lang="en"><meta charset="utf-8"><title>Message not sent</title>` +
      `<body><h1>Message not sent</h1><p>${escapeHtml(message)}</p>` +
      `<p><a href="/contact/">Back to contact</a></p></body></html>`,
    { status, headers: { 'content-type': 'text/html; charset=utf-8' } },
  );
}

export async function handleContact(
  request: Request,
  env: ContactEnv,
): Promise<Response> {
  if (isCrossOrigin(request)) {
    return errorPage('Please send your message from our contact page.', 403);
  }

  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';

  if (isRateLimited(ip)) {
    return errorPage('Too many messages. Please try again later.', 429);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return errorPage('The message could not be read.');
  }

  // Honeypot: real people leave this empty. Pretend it worked.
  if (clean(form.get('company'))) {
    return new Response(null, { status: 303, headers: { Location: '/thank-you/' } });
  }

  const name = clean(form.get('name'));
  const email = clean(form.get('email'));
  const message = clean(form.get('message'));

  if (!name || !email || !message) {
    return errorPage('Please fill in your name, email and message.');
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return errorPage('That message is too long.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return errorPage('Please enter a valid email address.');
  }

  // Tell the sender, rather than dropping it, in case a real person trips this.
  if (looksLikeSpam(name, message)) {
    return errorPage('Please remove some links and try again, or email us instead.');
  }

  // Optional Turnstile. Only enable it when the widget is on the page and the
  // secret is set; otherwise every submission would fail verification.
  if (env.TURNSTILE_SECRET_KEY) {
    const token = clean(form.get('cf-turnstile-response'));
    if (!token) {
      return errorPage('Please complete the verification and try again.');
    }

    const verify = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: token,
          remoteip: ip,
        }),
      },
    );
    const result = (await verify.json()) as { success?: boolean };
    if (!result.success) {
      return errorPage('Verification failed. Please try again.');
    }
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    return errorPage('The contact form is not configured yet.', 503);
  }

  const subject = `Website contact from ${name}`.replace(/[\r\n]+/g, ' ');
  const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      reply_to: email,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text());
    return errorPage('The message could not be sent. Please email us instead.', 502);
  }

  return new Response(null, { status: 303, headers: { Location: '/thank-you/' } });
}
