// app/[lang]/page.tsx
import { useTranslations, createTranslator } from 'next-intl'; // Import createTranslator
import type { Metadata } from 'next'; // Import Metadata type
import HeroSection from '@/components/sections/HeroSection';
import DeliveryOptionsSection from '@/components/sections/DeliveryOptionsSection';
import PartnerLogosSection from '@/components/sections/PartnerLogosSection';

type Props = {
  params: { lang: string };
};

// --- Updated generateMetadata ---
export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
    try {
        const messages = (await import(`../../messages/${lang}.json`)).default;
        const t = createTranslator({ locale: lang, messages });
        const siteName = t('Metadata.siteName') || "Snacky"; // Example

        return {
            title: t('Homepage.metaTitle') || t('Navbar.home'), // Example: Specific title or fallback
            description: t('Homepage.metaDescription'), // Add this key to messages/lang.json
            // Add other relevant meta tags, OpenGraph, etc.
            openGraph: {
              title: t('Homepage.metaTitle') || t('Navbar.home'),
              description: t('Homepage.metaDescription'),
              // Add images, url etc.
          },
        };
    } catch (error) {
        console.error("Failed to generate metadata for Homepage, lang:", lang, error);
        return { // Fallback metadata
            title: "Home",
            description: "Welcome to Snacky Peanut Butter.",
        };
    }
}
// --- End of Updated generateMetadata ---


export default function HomePage({ params }: Props) { // Access params directly
  const lang = params.lang; // Get lang

  const t = useTranslations('Homepage');

  return (
    <div>
      <HeroSection
          buyDirectlyText={t('buyDirectly')}
          lang={lang}
      />
      <DeliveryOptionsSection
          title={t('orderThrough')}
          lang={lang}
      />
       <PartnerLogosSection
          title={t('soldIn')}
          lang={lang}
       />
    </div>
  );
}