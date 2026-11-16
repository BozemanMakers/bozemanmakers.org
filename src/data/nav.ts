import { org } from './org';
import { wiki } from './wiki';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// Labels are the current menu's labels (docs/08-mvp-build-plan.md §1).
// The logo links home, so "Home" is not repeated in the text nav.
export const nav: NavItem[] = [
  { label: 'Tools', href: '/tools/' },
  { label: 'Organization', href: '/organization/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Wiki', href: wiki.toolsShelf, external: true },
  { label: 'Facebook', href: org.facebook, external: true },
  { label: 'Photos', href: org.photos, external: true },
];
