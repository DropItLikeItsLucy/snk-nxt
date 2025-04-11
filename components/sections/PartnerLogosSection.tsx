// components/sections/PartnerLogosSection.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Optional: if logos link somewhere

// Define structure for partner market data
type PartnerMarket = {
  name: string;
  logoUrl: string; // Path to the logo image in /public folder
  altText: string;
  link?: string; // Optional link if the logo is clickable
};

// Example data - Replace with your actual market partners and logo paths
const partnerMarkets: PartnerMarket[] = [
  { name: 'SuperMarket One', logoUrl: '/images/logos/market-one.png', altText: 'SuperMarket One Logo' }, // <<< Replace paths/names
  { name: 'Grocery Chain Two', logoUrl: '/images/logos/market-two.png', altText: 'Grocery Chain Two Logo' },
  { name: 'Local Store Three', logoUrl: '/images/logos/market-three.svg', altText: 'Local Store Three Logo' },
  { name: 'HyperMart Four', logoUrl: '/images/logos/market-four.png', altText: 'HyperMart Four Logo' },
  // Add more partners
];

type PartnerLogosSectionProps = {
  title: string; // Translated title like "Sold in Markets"
  lang: string; // Current language (might be needed for links)
};

const PartnerLogosSection = ({ title, lang }: PartnerLogosSectionProps) => {
  return (
    <section className="bg-gray-50 py-12"> {/* Added a light background */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-8">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
          {partnerMarkets.map((partner) => {
            const logoContent = (
              <Image
                src={partner.logoUrl}
                alt={partner.altText}
                width={120} // Adjust default width as needed
                height={60} // Adjust default height as needed
                className="mx-auto filter grayscale hover:filter-none transition duration-300 ease-in-out" // Example: grayscale, color on hover
                style={{ objectFit: 'contain' }} // Ensure logo aspect ratio is maintained
              />
            );

            if (partner.link) {
              // If a link is provided, wrap the Image in a Link/anchor
              const isExternal = partner.link.startsWith('http');
              return isExternal ? (
                <a href={partner.link} key={partner.name} target="_blank" rel="noopener noreferrer">
                  {logoContent}
                </a>
              ) : (
                <Link href={partner.link} key={partner.name}>
                    {logoContent}
                </Link>
              );
            }

            // If no link, just render the image
            return <div key={partner.name}>{logoContent}</div>;

          })}
        </div>
         {/* Optional: Link to the full Markets page */}
         <div className="mt-8">
            <Link href={`/${lang}/markets`} className="text-orange-600 hover:underline font-semibold">
                View all locations
            </Link>
         </div>
      </div>
    </section>
  );
};

export default PartnerLogosSection;