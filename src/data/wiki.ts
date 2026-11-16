// Every wiki URL in one place. Canonical host is wiki.bozemanmakerspace.com;
// never link the wiki.spen.cc alias (decision D6, docs/03-wiki-content-map.md §6).

const base = 'https://wiki.bozemanmakerspace.com';

export const wiki = {
  home: `${base}/`,
  shelves: `${base}/shelves`,
  toolsShelf: `${base}/shelves/tools-at-the-makerspace`,

  faq: `${base}/books/frequently-asked-questions/page/frequently-asked-questions-OcX`,
  policies: `${base}/books/rules-and-policies`,
  newMember: `${base}/books/rules-and-policies/page/new-member-orientation`,
  guestPolicy: `${base}/books/rules-and-policies/page/guest-policy`,
  storagePolicy: `${base}/books/rules-and-policies/page/storage-policy`,
  parking: `${base}/books/rules-and-policies/page/parking-policy`,
  codeOfConduct: `${base}/books/rules-and-policies/page/makerspace-code-of-conduct`,
  feeSchedule: `${base}/books/rules-and-policies/page/fee-schedule`,

  currentOfficers: `${base}/books/organization/page/current-officers`,
  bylaws: `${base}/books/organization/page/bylaws`,

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
