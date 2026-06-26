/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        heading: ['Inter', 'ui-sans-serif', 'sans-serif'],
      },
      colors: {
        // Backwards-compat keys (existing pages still use these)
        brand: {
          DEFAULT: "#2E5984",
          hover: "#1F4E79",
          muted: "#EAF1F9",
          50: "#F2F6FB",
          100: "#DCE7F2",
          200: "#B7CDE4",
          300: "#88AED2",
          400: "#5C8FBE",
          500: "#3E76AB",
          600: "#2E5984",
          700: "#1F4E79",
          800: "#173E62",
          900: "#102E4A",
        },
        ink: {
          50: "#F8FAFC",
          100: "#F1F4F8",
          200: "#E3E8EF",
          300: "#CBD3DE",
          400: "#9BA7B8",
          500: "#6B7785",
          600: "#4A5462",
          700: "#374151",
          800: "#1F2937",
          900: "#0F172A",
        },
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(15,23,42,0.04), 0 1px 1px 0 rgba(15,23,42,0.03)",
        elev: "0 8px 24px -8px rgba(15,23,42,0.10), 0 1px 2px rgba(15,23,42,0.05)",
      },
      fontSize: {
        // Dense, info-rich scale aligned with Aarambh
        '11': '11px',
        '12': '12px',
        '13': '13px',
      },
    },
  },
  plugins: [],
};
