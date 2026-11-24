// Every wiki URL in one place. Canonical host is wiki.bozemanmakerspace.com;
// never link the wiki.spen.cc alias (decision D6, docs/decisions/03-wiki-content-map.md §6).

const base = 'https://wiki.bozemanmakerspace.com';

export const wiki = {
  home: `${base}/`,
  toolsShelf: `${base}/shelves/tools-at-the-makerspace`,

  faq: `${base}/books/frequently-asked-questions/page/frequently-asked-questions-OcX`,
  policies: `${base}/books/rules-and-policies`,
  guestPolicy: `${base}/books/rules-and-policies/page/guest-policy`,
  codeOfConduct: `${base}/books/rules-and-policies/page/makerspace-code-of-conduct`,

  books: {
    woodworking: `${base}/books/woodworking`,
    electronics: `${base}/books/electronics`,
    metalworking: `${base}/books/metalworking`,
    textiles: `${base}/books/textiles`,
    jewelry: `${base}/books/jewelry`,
    printing3d: `${base}/books/3d-printing`,
    laserCutting: `${base}/books/laser-cutting`,
    painting: `${base}/books/painting`,
    pottery: `${base}/books/pottery`,
  },
} as const;
