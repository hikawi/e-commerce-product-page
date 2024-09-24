/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        p: {
          orange: "hsl(26, 100%, 55%)",
          "light-orange": "hsla(26, 100%, 71%, 1)",
          "pale-orange": "hsl(25, 100%, 94%)",
        },
        n: {
          "very-dark-blue": "hsl(220, 13%, 13%)",
          "dark-grayish-blue": "hsl(219, 9%, 45%)",
          "grayish-blue": "hsl(220, 14%, 75%)",
          "light-grayish-blue": "hsl(223, 64%, 98%)",
          "very-light-gray": "hsla(219, 35%, 92%, 1)",
        },
      },
      fontFamily: {
        "kumbh-sans": ["Kumbh Sans", "sans-serif"],
      },
      fontSize: {
        "sm-md": "0.9375rem",
      },
      spacing: {
        "desktop-x-pad": "10.31rem",
      },
    },
  },
  plugins: [],
};
