// app/[lang]/page.tsx (Ensure it matches THIS pattern)
// NO next-intl imports needed here except for Metadata type maybe
import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import DeliveryOptionsSection from '@/components/sections/DeliveryOptionsSection';
import PartnerLogosSection from '@/components/sections/PartnerLogosSection';

const locales = ['en', 'ka']; // For metadata validation

// Define the expected shape of the props passed from layout
type PageTranslations = {
    buyDirectly: string;
    orderThrough: string;
    soldIn: string;
};

type Props = {
  params: { lang: string };
  pageTranslations?: PageTranslations; // Prop from layout
};

// Use MINIMAL metadata temporarily
 export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
     if (!locales.includes(lang)) { return { title: 'Snacky' }; }
     // Bypassing i18n in metadata for now
     return {
         title: `Snacky (${lang}) - Page`,
         description: `Test Description (${lang})`,
     };
 }

// Component is NOT async, uses props
export default function HomePage({ params, pageTranslations }: Props) {
  const lang = params.lang;

  // --- NO useTranslations or getTranslations calls here ---

  const buyDirectlyText = pageTranslations?.buyDirectly || 'Buy Fallback';
  const orderThroughText = pageTranslations?.orderThrough || 'Order Fallback';
  const soldInText = pageTranslations?.soldIn || 'SoldIn Fallback';

  console.log(`--- Rendering HomePage for ${lang} with text: ${buyDirectlyText} ---`); // Add log

  return (
    <div>
      {/* Add a simple element to show it rendered */}
      <h1 className="text-xl p-4">Home Page Test ({lang})</h1>
      <HeroSection buyDirectlyText={buyDirectlyText} lang={lang} />
      <DeliveryOptionsSection title={orderThroughText} lang={lang} />
      <PartnerLogosSection title={soldInText} lang={lang} />
    </div>
  );
}