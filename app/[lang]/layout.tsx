// app/[lang]/layout.tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider, createTranslator  } from 'next-intl';
// import { getMessagesForLocale } from '../../i18n'; // Import the named function

import { notFound } from 'next/navigation';
import React from 'react'; // Import React
import { Inter } from 'next/font/google'; // Or your chosen font

// Import your layout components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';

// Import global styles (Tailwind entry point)
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] }); // Example font setup

// Define supported locales - useful for validation and static generation
const locales = ['en', 'ka'];

type Props = {
  children: ReactNode;
  params: { lang: string };
};

// This function tells Next.js which locales to pre-render at build time
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// --- Updated generateMetadata ---
export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  if (!locales.includes(lang)) { return { title: 'Snacky' }; }
  // Bypassing i18n in metadata for now
  return {
      title: `Snacky (${lang}) - Layout`,
      description: `Test Description (${lang})`,
  };
}
// --- End of Updated generateMetadata ---


export default async function LocaleLayout({ children, params }: Props) { // Must be async
  const lang = params.lang;
  if (!locales.includes(lang)) { notFound(); }

  // --- Load messages DIRECTLY (using minimal i18n.ts behind the scenes) ---
  // We need a way to get messages WITHOUT useMessages. getTranslator is async now.
  // Let's use the minimal i18n.ts implicitly via createTranslator
  // Note: This might still fail if createTranslator internally fails,
  // but let's try getting the messages first.
  let messages;
  try {
       // Re-import i18n logic IF NEEDED, but try without first
       // Assuming createTranslator somehow gets context from i18n.ts
       // If not, need to manually import messages here again
       // Let's load manually again to be safe:
       messages = lang === 'ka'
           ? { Navbar: { home: 'მთავარი (ტესტი)' }, Homepage: { buyDirectly: 'ყიდვა (ტესტი)', orderThrough: 'შეკვეთა (ტესტი)', soldIn: 'მარკეტები (ტესტი)' }, Metadata: { siteName: 'საიტი', defaultDescription: 'აღწერა' }, TopBar: {promo:'Promo KA', hours:'Hours KA', phone:'Phone KA'} }
           : { Navbar: { home: 'Home (Test)' }, Homepage: { buyDirectly: 'Buy (Test)', orderThrough: 'Order (Test)', soldIn: 'Markets (Test)' }, Metadata: { siteName: 'Site', defaultDescription: 'Description' }, TopBar: {promo:'Promo EN', hours:'Hours EN', phone:'Phone EN'} };
       console.log(`--- Manually set messages for ${lang} in layout ---`);
  } catch (error) {
       console.error(`Failed to set messages for layout, lang "${lang}":`, error);
       notFound();
  }


  // Use loaded messages to create translator
  const t = createTranslator({ locale: lang, messages });
  // Prepare props for the page
  const pageSpecificTranslations = {
      buyDirectly: t('Homepage.buyDirectly') || 'Buy Fallback',
      orderThrough: t('Homepage.orderThrough') || 'Order Fallback',
      soldIn: t('Homepage.soldIn') || 'SoldIn Fallback'
  };

  return (
      <html lang={lang} className={inter.className}>
          <body>
              {/* Provider is still needed for client components like TopBar */}
              <NextIntlClientProvider locale={lang} messages={messages}>
                  {/* TopBar uses useTranslations, needs provider */}
                  <TopBar />
                  <Header lang={lang} />
                  <main className="flex-grow">
                      {/* Pass needed translations to the Page component */}
                      {React.isValidElement(children) ? React.cloneElement(children as React.ReactElement<any>, { pageTranslations: pageSpecificTranslations }) : children}
                  </main>
                  <Footer lang={lang} />
              </NextIntlClientProvider>
          </body>
      </html>
  );
}