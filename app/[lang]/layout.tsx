// app/[lang]/layout.tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider, useMessages, createTranslator } from 'next-intl';
import { notFound } from 'next/navigation';
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
  // Use try-catch for robustness
  try {
      const messages = (await import(`../../messages/${lang}.json`)).default;
      // Provide a static type assertion if needed, or define MessageKeys type
      const t = createTranslator({ locale: lang, messages });
      const siteName = "Snacky"; // Or load from translations

      return {
          // Use translator function for title/description
          title: {
              default: siteName, // Default site title
              template: `%s | ${siteName}`, // Template for page titles
          },
          description: t('Metadata.defaultDescription'), // Example key
      };
  } catch (error) {
      console.error("Failed to generate metadata for lang:", lang, error);
      // Return default metadata on error
      return {
          title: 'Snacky',
          description: 'Delicious and healthy peanut butter.',
      };
  }
}
// --- End of Updated generateMetadata ---


export default function LocaleLayout({ children, params }: Props) { // Access params directly first
  const lang = params.lang; // Then get lang

  // REMOVED redundant validation: if (!locales.includes(lang as any)) notFound();

  // useMessages should pick up context from i18n.ts
  const messages = useMessages();

  return (
    <html lang={lang} className={inter.className}>
      <body>
        <NextIntlClientProvider locale={lang} messages={messages}>
          <TopBar />
          <Header lang={lang} />
          <main className="flex-grow">{children}</main>
          <Footer lang={lang} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}