// app/[lang]/layout.tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider, createTranslator } from 'next-intl';
import { getMessagesForLocale } from '../../i18n'; // Import the named function

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
  let messages; try { messages = (await import(`../../messages/${lang}.json`)).default; } catch (error) { return { title: 'Snacky', description: 'Error loading content.' }; }
  // Correct import for createTranslator
  const t = createTranslator({ locale: lang, messages });
  const siteName = t('Metadata.siteName') || "Snacky"; const defaultDescription = t('Metadata.defaultDescription') || 'Delicious and healthy peanut butter.';
  return { title: { default: siteName, template: `%s | ${siteName}` }, description: defaultDescription };
}
// --- End of Updated generateMetadata ---


export default async function LocaleLayout({ children, params }: Props) { // Must be async
  const lang = params.lang;
  if (!locales.includes(lang)) { notFound(); }

  let messages;
    try {
        messages = await getMessagesForLocale(lang);
    } catch (error) {
         // Error handling might be redundant if getMessagesForLocale calls notFound()
         console.error(`Error calling getMessagesForLocale for lang "${lang}" in layout:`, error);
         notFound();
    }

  // Create translator here if needed, or just get strings
  // const t = createTranslator({ locale: lang, messages });
  // const pageSpecificTranslations = {
  //     buyDirectly: t('Homepage.buyDirectly') || 'Buy from Website',
  //     orderThrough: t('Homepage.orderThrough') || 'Order through Delivery Partners',
  //     soldIn: t('Homepage.soldIn') || 'Sold in Markets'
  // };

  return (
        <html lang={lang} className={inter.className}>
            <body>
                {/* Pass explicitly loaded messages */}
                <NextIntlClientProvider locale={lang} messages={messages}>
                    <TopBar />
                    <Header lang={lang} />
                    <main className="flex-grow">
                        {/* Pass props to children if using that pattern */}
                        {React.isValidElement(children) ? React.cloneElement(children as React.ReactElement<any>, { /* Pass props if needed */ }) : children}
                    </main>
                    <Footer lang={lang} />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}