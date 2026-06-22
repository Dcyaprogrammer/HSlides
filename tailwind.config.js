/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Neo-brutalism accent colors
        cyan: {
          DEFAULT: "#79F7FF",
        },
        pink: {
          DEFAULT: "#FFA6F6",
        },
        lime: {
          DEFAULT: "#7df752",
        },
        violet: {
          DEFAULT: "#A8A6FF",
        },
        yellow: {
          DEFAULT: "#FFE500",
        },
        orange: {
          DEFAULT: "#FFC29F",
        },
        red: {
          DEFAULT: "#FF9F9F",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-in-soft": {
          "0%": { transform: "scale(0.97)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.95)", opacity: "0" },
        },
        "scale-out-soft": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.97)", opacity: "0" },
        },
        "fade-in-slow": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out-slow": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.2s ease-in",
        "scale-in": "scale-in 0.3s ease-out",
        "scale-out": "scale-out 0.2s ease-in",
        "scale-in-soft": "scale-in-soft 0.3s ease-out",
        "scale-out-soft": "scale-out-soft 0.2s ease-in",
        "fade-in-slow": "fade-in-slow 0.4s ease-out",
        "fade-out-slow": "fade-out-slow 0.3s ease-in",
      },
      boxShadow: {
        "soft": "0 4px 20px rgba(0, 0, 0, 0.15)",
        "soft-lg": "0 8px 30px rgba(0, 0, 0, 0.15)",
        "soft-xl": "0 12px 40px rgba(0, 0, 0, 0.15)",
      },
      backgroundImage: {
        'aurora-1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'aurora-2': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'aurora-3': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
