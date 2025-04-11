// components/sections/HeroSection.tsx
import React from 'react';
import Image from 'next/image'; // Import next/image
import Button from '@/components/ui/Button'; // Assuming Button is in ui folder

type HeroSectionProps = {
  buyDirectlyText: string; // Get translated text from page
  lang: string;
};

const HeroSection = ({ buyDirectlyText, lang }: HeroSectionProps) => {
  return (
    <section className="container mx-auto px-4 py-8 md:py-16"> {/* Adjust padding as needed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* Left Column: Product Image */}
        <div className="w-full flex justify-center md:justify-end">
          {/* Replace with your actual product image path and dimensions */}
          <Image
            src="/images/snacky-product-main.png" // <<< CHANGE THIS PATH
            alt="Snacky Peanut Butter Product" // <<< CHANGE ALT TEXT
            width={500} // <<< ADJUST WIDTH
            height={500} // <<< ADJUST HEIGHT
            priority // Load the main hero image eagerly
            className="max-w-sm md:max-w-md lg:max-w-lg object-contain" // Adjust size constraints
          />
        </div>

        {/* Right Column: Call to Actions */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
           {/* You might want a Headline H1 here eventually! */}
           {/* <h1 className="text-4xl font-bold mb-4">Your Catchy Headline</h1> */}

           {/* Primary Buy Button */}
           <Button
              variant="primary" // Use your primary button style
              href={`/${lang}/product`} // Link to product page
              className="mb-6 w-full md:w-auto" // Button styling
              size="lg" // Make it large
           >
             {buyDirectlyText} {/* Use translated text */}
           </Button>

           {/* Delivery Options section might be separate or included here */}
           {/* Depending on how you structure DeliveryOptionsSection */}
           {/* If DeliveryOptionsSection is separate, you can remove it from here */}
           {/* <h2 className="text-xl font-semibold mb-3">Order Through:</h2> */}
           {/* ... buttons for delivery partners ... */}

        </div>

      </div>
    </section>
  );
};

export default HeroSection;