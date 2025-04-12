// i18n.ts (Modified for named export)
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import type { AbstractIntlMessages } from 'next-intl'; // Import type

const locales = ['en', 'ka'];

function isValidLocale(locale: any): locale is 'en' | 'ka' {
    return locales.includes(locale);
}

// Export the async logic as a named function
export const getMessagesForLocale = async (locale: string): Promise<AbstractIntlMessages> => {
    if (!isValidLocale(locale)) {
        console.error(`Invalid locale passed to getMessagesForLocale: "${locale}".`);
        notFound();
    }
    try {
        // Explicitly type the return of import
        const messages: AbstractIntlMessages = (await import(`./messages/${locale}.json`)).default;
        return messages;
    } catch (error) {
        console.error(`Failed to load messages for locale "${locale}" in getMessagesForLocale:`, error);
        notFound();
    }
};

// Keep the default export for standard mechanism, but it might not be used
export default getRequestConfig(async ({ locale }) => {
  // Validation now mainly done within the named export, but keep basic check
  if (!isValidLocale(locale)) {
    console.error(`Invalid locale received in getRequestConfig: "${locale}".`);
    notFound();
  }
  const messages = await getMessagesForLocale(locale); // Call the named export
  return {
    locale,
    messages
  };
});