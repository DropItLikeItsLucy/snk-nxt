// components/layout/Navigation.tsx
'use client'; // Mark as client component for hooks like usePathname and potentially state later

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

// Define the structure for a navigation link
type NavLink = {
    href: string; // Base path without locale
    labelKey: string; // Key from the translation file (e.g., "home", "product")
};

// Define your navigation links here
const navLinks: NavLink[] = [
  { href: '/', labelKey: 'home' },
  { href: '/product', labelKey: 'product' },
  { href: '/markets', labelKey: 'markets' },
  { href: '/category/blog', labelKey: 'blog' }, // Updated blog path
  { href: '/about', labelKey: 'about' },
  { href: '/contact', labelKey: 'contact' },
];

// Props expected by the Navigation component
type NavigationProps = {
  lang: string; // Current language locale (e.g., "en", "ka")
  // Add props for mobile menu state (e.g., isOpen, setIsOpen) if needed later
};

const Navigation = ({ lang }: NavigationProps) => {
  const t = useTranslations('Navbar'); // Access the 'Navbar' section of your translations
  const pathname = usePathname(); // Get the current full path (includes locale)

  return (
    <nav>
      {/* --- DESKTOP NAVIGATION --- */}
      <ul className="hidden md:flex items-center space-x-6"> {/* Hide on small screens, flex on medium+ */}
        {navLinks.map((link) => {
          // Construct the full, localized path for the link
          // Handle root path ('/') separately to avoid double slash '//'
          const localizedHref = `/${lang}${link.href === '/' ? '' : link.href}`;

          // Determine if the current link is active
          // Compare the full pathname with the constructed localized href
          const isActive = pathname === localizedHref;

          return (
            <li key={link.href}>
              <Link
                href={localizedHref}
                className={`text-gray-700 hover:text-orange-600 transition-colors ${
                  isActive ? 'font-semibold border-b-2 border-orange-500' : '' // Active link styling
                }`}
              >
                {t(link.labelKey)} {/* Display the translated label */}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* --- MOBILE NAVIGATION (Placeholder/Button) --- */}
      <div className="md:hidden"> {/* Show only on small screens */}
          {/* Add a button here to toggle a mobile menu */}
          <button aria-label="Open menu">
             {/* Hamburger Icon SVG or similar */}
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-8 6h8" />
             </svg>
          </button>
          {/* The actual mobile menu dropdown/overlay would typically be implemented here or in the Header, controlled by state */}
      </div>
    </nav>
  );
};

export default Navigation;