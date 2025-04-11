// components/layout/Header.tsx
import React from 'react';
import Navigation from './Navigation'; // Assuming Navigation is also in layout
import Link from 'next/link';

type HeaderProps = {
  lang: string;
};

const Header = ({ lang }: HeaderProps) => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
           <Link href={`/${lang}`}>Snacky</Link> {/* Link logo to homepage */}
        </div>
        <Navigation lang={lang} /> {/* Include Navigation */}
        {/* Add Cart, Auth buttons here */}
      </div>
    </header>
  );
};

export default Header;