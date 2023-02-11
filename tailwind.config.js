module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        // 'banner-login': "url('../public/banner-login.png')",
        'banner-login': "url('../public/dummy-banner-login.png')",
        'bg-post': "url('../public/bg-original.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
