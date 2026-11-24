// Functional strings only: titles, meta descriptions, alt text, aria labels,
// form labels and error text. Visible page copy lives in the page templates
// with a `source:` comment. See docs/08-mvp-build-plan.md §2.

export const microcopy = {
  meta: {
    home: {
      title: 'Bozeman Makerspace – A community workshop in Bozeman Montana',
      description:
        'A community workshop in Bozeman, Montana. Open to the public Thursdays 6:30–8:00 PM at 10 Innovation Ln Unit D. Members have 24/7 access.',
    },
    membership: {
      title: 'Membership – Bozeman Makerspace',
      description:
        'Join the Bozeman Makerspace. Standard $50/month or Student Age $20/month, with 24/7 access, all tools and a storage locker.',
    },
    tools: {
      title: 'Tools – Bozeman Makerspace',
      description:
        'Tools at the Bozeman Makerspace: woodworking, electronics, metalworking, 3D printing, laser cutting, textiles, jewelry, pottery and painting.',
    },
    organization: {
      title: 'Organization – Bozeman Makerspace',
      description:
        'Bozeman Makerspace is a 501(c)(3) nonprofit. Meet the 2026 officers and read the full bylaws.',
    },
    contact: {
      title: 'Contact – Bozeman Makerspace',
      description:
        'Contact the Bozeman Makerspace officers, find the address and public hours, or read the FAQ.',
    },
    thankYou: {
      title: 'Thank You – Bozeman Makerspace',
      description: 'Thank you for supporting the Bozeman Makerspace.',
    },
    notFound: {
      title: 'Page not found – Bozeman Makerspace',
      description: 'Page not found – Bozeman Makerspace.',
    },
  },

  alt: {
    hero: 'The Bozeman Makerspace shop floor, with a table saw, planer and dust collection.',
    shield: 'Bozeman Makerspace, est. 2011',
  },

  aria: {
    skip: 'Skip to content',
    primaryNav: 'Primary',
    footerNav: 'Elsewhere',
    bylawsNav: 'Bylaws contents',
    calendar: 'Bozeman Makerspace events calendar',
    opensNewTab: 'opens in a new tab',
  },

  form: {
    name: 'Name',
    email: 'Email',
    message: 'Message',
    required: '(required)',
    submit: 'Submit',
    honeypot: 'Leave this field empty',
  },
} as const;
