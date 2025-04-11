// components/layout/TopBar.tsx
'use client' // Use client if we potentially use hooks like useTranslations directly here

import React from 'react';
import { useTranslations } from 'next-intl'; // Import useTranslations

type TopBarProps = {
    // lang prop might not be strictly needed if using useTranslations
    // lang: string;
};

// Note: TopBar might be simple enough to not need 'lang' prop
// if you use useTranslations hook directly within it.
const TopBar = (/* { lang }: TopBarProps */) => {
  const t = useTranslations('TopBar'); // Load translations for TopBar namespace

  return (
    <div className="bg-orange-500 text-white text-sm p-2"> {/* Example Styling */}
      <div className="container mx-auto flex justify-between items-center">
        <span>{t('promo')}</span> {/* Use translation key */}
        <div className="space-x-4">
          <span>{t('hours')}</span> {/* Use translation key */}
          <span>{t('phone')}</span> {/* Use translation key */}
        </div>
      </div>
    </div>
  );
};

export default TopBar;