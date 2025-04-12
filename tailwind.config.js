// tailwind.config.js (Make sure it looks like this)

/** @type {import('tailwindcss').Config} */
module.exports = {
    // --- ADD OR MODIFY THIS ---
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}", // Scan all relevant files inside 'app'
      "./components/**/*.{js,ts,jsx,tsx,mdx}", // Scan all relevant files inside 'components'
      // Add other top-level directories containing Tailwind classes if needed
      // e.g., "./src/**/*.{js,ts,jsx,tsx,mdx}", if you were using an 'src' folder
    ],
    // --- END OF CONTENT ---
    theme: {
      extend: {
        // You can add custom theme extensions here later
        // colors: { ... }
      },
    },
    plugins: [
        // Add any Tailwind plugins here if needed later
    ],
  }