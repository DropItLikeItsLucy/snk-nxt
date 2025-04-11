// components/ui/Button.tsx
import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import clsx from 'clsx'; // Utility for conditional classes

// Define possible button variants (add more as needed)
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'delivery-green' | 'delivery-blue'; // Add your delivery button variants
type ButtonSize = 'sm' | 'md' | 'lg';

// Base props common to both button and anchor
interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string; // Allow custom classes
  leftIcon?: React.ReactNode; // Optional icon on the left
  rightIcon?: React.ReactNode; // Optional icon on the right
}

// Props specifically for rendering as an anchor tag <a/>
interface ButtonLinkProps extends ButtonBaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  href: string; // Required for links
  onClick?: never; // onClick is not typical on pure links handled by href
}

// Props specifically for rendering as a button tag <button/>
interface ButtonButtonProps extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  href?: never; // href is not for buttons
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// Union type for component props, allowing either link or button props
type ButtonProps = ButtonLinkProps | ButtonButtonProps;


const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    leftIcon,
    rightIcon,
    href,
    ...rest // Pass down other props like onClick, type="submit", disabled, etc.
  }, ref) => {

    // --- Define Base Styles ---
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed';

    // --- Define Size Styles ---
    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    // --- Define Variant Styles ---
    // Adjust colors to match your design! Use your Tailwind theme colors if configured.
    const variantStyles: Record<ButtonVariant, string> = {
      primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
      outline: 'border border-orange-500 text-orange-500 hover:bg-orange-50 focus:ring-orange-500',
      ghost: 'bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-400',
      'delivery-green': 'bg-green-100 border border-green-600 text-green-700 hover:bg-green-200 focus:ring-green-500', // Example for delivery buttons
      'delivery-blue': 'bg-blue-100 border border-blue-600 text-blue-700 hover:bg-blue-200 focus:ring-blue-500',     // Example for delivery buttons
    };

    // Combine classes using clsx
    const combinedClassName = clsx(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className // Allow overriding or adding custom classes
    );

    const content = (
      <>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </>
    );

    // Render as a Link if href is provided
    if (href) {
      // Check if it's an external link
      const isExternal = href.startsWith('http://') || href.startsWith('https://');

      if (isExternal) {
        return (
          <a
            href={href}
            className={combinedClassName}
            ref={ref as React.Ref<HTMLAnchorElement>}
            target="_blank" // Open external links in new tab
            rel="noopener noreferrer"
            {...(rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'>)} // Spread remaining anchor props
          >
            {content}
          </a>
        );
      } else {
        // Internal link using next/link
        return (
          <Link
            href={href}
            className={combinedClassName}
            ref={ref as React.Ref<HTMLAnchorElement>}
            {...(rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'>)} // Spread remaining anchor props
          >
            {content}
          </Link>
        );
      }
    }

    // Render as a button if no href
    return (
      <button
        className={combinedClassName}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(rest as Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>)} // Spread remaining button props
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button'; // Useful for debugging

export default Button;