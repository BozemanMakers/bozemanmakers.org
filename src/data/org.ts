// Canonical facts. Edit here, not in page templates.
// Sources: docs/decisions/02-content-inventory.md §1, docs/archive/*.md, live site 2026-11-15.
// V-numbers refer to the verification list in docs/decisions/06-open-questions.md.

export const org = {
  name: 'Bozeman Makerspace',
  tagline: 'A community workshop in Bozeman Montana',

  address: {
    street: '10 Innovation Ln Unit D',
    city: 'Bozeman',
    region: 'MT',
    postalCode: '59718',
    country: 'US',
    note: '(Rear entrance of building)',
    display: '10 Innovation Ln Unit D, Bozeman, MT 59718',
  },
  mapUrl: 'https://goo.gl/maps/jH1bcA8uk3vs2Th87',

  email: 'makers@bozemanmakers.com',

  hours: {
    publicLabel: 'Open To The Public',
    public: 'Thurs 6:30 - 8:00 PM',
    publicLong: 'Thursdays from 6:30 to 8:00 PM',
    publicDay: 'Thursday',
    publicOpens: '18:30',
    publicCloses: '20:00',
    membersLabel: 'Members',
    members: '24/7',
  },

  membership: {
    standard: {
      name: 'Standard',
      price: '$50 / month',
      planId: '75972',
    },
    college: {
      name: 'Student Age (18-25)',
      price: '$20 / month',
      planId: '78970',
    },
    household: {
      name: 'Household',
      price: '$80 / month',
      note: 'Two adults at one address. Add a third for $40 / month.',
      planId: '146263',
    },
    perks: [
      '24/7 Access',
      'Use of all Makerspace tools',
      'Personal storage locker',
      'Discounted class fees',
    ],
  },

  memberful: {
    checkout: 'https://bozemanmakerspace.memberful.com/checkout?plan=',
    portal: 'https://bozemanmakerspace.memberful.com/auth/sign_in',
  },

  donate: 'https://donate.stripe.com/eVq9AUfuH5f11sp0IQaIM02',
  mailerlite:
    'https://dashboard.mailerlite.com/forms/12955/51324291966306002/share',
  facebook: 'https://www.facebook.com/bozemanmakerspace',
  photos: 'https://photos.app.goo.gl/3PTaiqCZgb3B3T6q1',

  // Copied from the live home page iframe on 2026-11-15.
  calendarEmbed:
    'https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FDenver&mode=MONTH&showPrint=0&showTitle=0&showCalendars=0&src=Y182ZjZiZjhlMDNhYTAyYmEyYWIyNmYwYTA5ZWI4YTYwMzA2M2RhMjliZDkwODZiYzY2NzkxYzcwZDU1YmJhMWJjQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23ef6c00',

  releaseForm: '/forms/member-and-guest-release.pdf',
} as const;
