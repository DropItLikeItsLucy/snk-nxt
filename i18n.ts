// i18n.ts
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'ka'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  // Basic validation: Check if the provided locale is in our supported list
  if (!locales.includes(locale as any)) {
      console.error(`Invalid locale received: "${locale}". Supported locales: ${locales.join(', ')}`);
      notFound();
  }

  try {
    // Dynamically import the messages for the requested locale
    const messages = (await import(`./messages/${locale}.json`)).default;

    // Return the configuration object including both locale and messages
    return {
      locale, // <-- Ensure this line is added/present
      messages
    };
  } catch (error) {
    // Log error if message file import fails
    console.error(`Failed to load messages for locale "${locale}":`, error);
    notFound(); // Trigger 404 if messages can't be loaded
  }
});