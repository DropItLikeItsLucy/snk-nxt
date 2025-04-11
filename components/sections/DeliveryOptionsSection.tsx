// components/sections/DeliveryOptionsSection.tsx
import React from 'react';
import Button from '@/components/ui/Button'; // Import the Button component

// Define structure for delivery partner data (adjust as needed)
type DeliveryPartner = {
  name: string;
  logoUrl?: string; // Optional: if you want logos on buttons
  link: string; // External link to the partner's page for your product
  variant: 'delivery-green' | 'delivery-blue'; // Example variants from Button component
};

// Example data - replace with your actual partners
const deliveryPartners: DeliveryPartner[] = [
  { name: 'Wolt', link: 'https://wolt.com/en/discovery', variant: 'delivery-blue' }, // Replace link
  { name: 'Glovo', link: 'https://glovoapp.com/en/discovery', variant: 'delivery-green' }, // Replace link
  { name: 'Bolt Food', link: 'https://food.bolt.eu/en-US/', variant: 'delivery-green' }, // Replace link
  // Add more partners here
];

type DeliveryOptionsSectionProps = {
  title: string; // Translated title like "Order through Delivery Partners"
  lang: string; // Current language (might be needed for Button if it expects lang)
};

const DeliveryOptionsSection = ({ title, lang }: DeliveryOptionsSectionProps) => {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">{title}</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {deliveryPartners.map((partner) => (
          <Button
            key={partner.name}
            href={partner.link} // Use the external link
            variant={partner.variant} // Use the defined variant
            size="md"
            className="w-full sm:w-auto" // Full width on small screens, auto on larger
            // Optionally add an icon if needed:
            // leftIcon={partner.logoUrl ? <Image src={partner.logoUrl} alt={`${partner.name} logo`} width={20} height={20} /> : undefined}
          >
            {partner.name}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default DeliveryOptionsSection;