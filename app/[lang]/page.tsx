// app/[lang]/page.tsx
import { createTranslator } from 'next-intl'; // Import createTranslator
import type { Metadata } from 'next'; // Import Metadata type
import HeroSection from '@/components/sections/HeroSection';
import DeliveryOptionsSection from '@/components/sections/DeliveryOptionsSection';
import PartnerLogosSection from '@/components/sections/PartnerLogosSection';

const locales = ['en', 'ka']; // Needed for metadata validation

// Define the expected shape of the props passed from layout
type PageTranslations = {
    buyDirectly: string;
    orderThrough: string;
    soldIn: string;
};

type Props = {
  params: { lang: string };
  // Make sure the component accepts this prop
  pageTranslations?: PageTranslations;
};
// --- Updated generateMetadata ---
export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  if (!locales.includes(lang)) { return { title: 'Snacky' }; }
  let messages; try { messages = (await import(`../../messages/${lang}.json`)).default; } catch (error) { return { title: 'Snacky', description: 'Error loading content.' }; }
  // Correct import location
  const t = createTranslator({ locale: lang, messages });
  const siteName = t('Metadata.siteName') || "Snacky"; const homeTitle = t('Homepage.metaTitle') || t('Navbar.home') || 'Home'; const homeDescription = t('Homepage.metaDescription') || 'Buy Snacky peanut butter...';
  return { title: homeTitle, description: homeDescription, openGraph: { title: homeTitle, description: homeDescription } };
}

// Component is NOT async
export default function HomePage({ params, pageTranslations }: Props) {
const lang = params.lang;

// --- NO useTranslations or getTranslations calls here ---

// Use translations passed as props
const buyDirectlyText = pageTranslations?.buyDirectly || 'Buy from Website';
const orderThroughText = pageTranslations?.orderThrough || 'Order through Delivery Partners';
const soldInText = pageTranslations?.soldIn || 'Sold in Markets';

return (
 <div>
   <HeroSection buyDirectlyText={buyDirectlyText} lang={lang} />
   <DeliveryOptionsSection title={orderThroughText} lang={lang} />
   <PartnerLogosSection title={soldInText} lang={lang} />
 </div>
);
}