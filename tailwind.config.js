/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    darkMode: "class", // Add this line
    theme: {
        extend: {
            colors: {
                chBgPrimary: "var(--color-chBgPrimary)",
                chBgSecondary: "var(--color-chBgSecondary)",

                chBorder: "var(--color-chBorder)",

                chTextPrimary: "var(--color-chTextPrimary)",
                chTextSecondary: "var(--color-chTextSecondary)",

                chTextPrimaryInverted: "var(--color-chTextPrimaryInverted)",
                chTextSecondaryInverted: "var(--color-chTextSecondaryInverted)",

                ctaPrimary: "var(--color-ctaPrimary)",
                ctaSecondary: "var(--color-ctaSecondary)",
            },
            fontFamily: {
                serif: ["var(--font-serif)"],
                accent: ["var(--font-accent)"],
                mono: ["var(--font-mono)"],
            },
        },
    },
    plugins: [],
};
