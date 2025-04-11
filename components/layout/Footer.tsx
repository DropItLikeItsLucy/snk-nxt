// components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link';

type FooterProps = {
  lang: string;
};

const Footer = ({ lang }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-700 p-4 mt-8"> {/* Added mt-8 for spacing */}
      <div className="container mx-auto text-center text-sm">
        <p>© {currentYear} Snacky. All Rights Reserved.</p>
        <div className="mt-2 space-x-4">
          <Link href={`/${lang}/privacy`} className="hover:underline">Privacy Policy</Link>
          <Link href={`/${lang}/terms`} className="hover:underline">Terms of Service</Link>
          <Link href={`/${lang}/contact`} className="hover:underline">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;