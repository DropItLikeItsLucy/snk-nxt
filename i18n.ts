// i18n.ts (Modified for named export)
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
// import type { AbstractIntlMessages } from 'next-intl'; // Import type
console.log("--- Loading i18n.ts ---"); // Check if file is loaded at all

const locales = ['en', 'ka'];

function isValidLocale(locale: any): locale is 'en' | 'ka' {
    return locales.includes(locale);
}

// // Export the async logic as a named function
// export const getMessagesForLocale = async (locale: string): Promise<AbstractIntlMessages> => {
//     if (!isValidLocale(locale)) {
//         console.error(`Invalid locale passed to getMessagesForLocale: "${locale}".`);
//         notFound();
//     }
//     try {
//         // Explicitly type the return of import
//         const messages: AbstractIntlMessages = (await import(`./messages/${locale}.json`)).default;
//         return messages;
//     } catch (error) {
//         console.error(`Failed to load messages for locale "${locale}" in getMessagesForLocale:`, error);
//         notFound();
//     }
// };

// Keep the default export for standard mechanism, but it might not be used
export default getRequestConfig(async ({ locale }) => {
  console.log(`--- getRequestConfig called with locale: ${locale} ---`);
  if (!isValidLocale(locale)) {
    console.error("--- Invalid locale in getRequestConfig ---");
    notFound(); // Use notFound for invalid paths
  }
  const messages = locale === 'ka'
     ? { Navbar: { home: 'მთავარი (ტესტი)' }, Homepage: { buyDirectly: 'ყიდვა (ტესტი)', orderThrough: 'შეკვეთა (ტესტი)', soldIn: 'მარკეტები (ტესტი)' }, Metadata: { siteName: 'საიტი', defaultDescription: 'აღწერა' } }
     : { Navbar: { home: 'Home (Test)' }, Homepage: { buyDirectly: 'Buy (Test)', orderThrough: 'Order (Test)', soldIn: 'Markets (Test)' }, Metadata: { siteName: 'Site', defaultDescription: 'Description' } };
  console.log(`--- Returning hardcoded messages for ${locale} ---`);
  return { locale, messages };
});