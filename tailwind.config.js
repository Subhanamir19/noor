/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        emerald: '#10B981',
        gold: '#F59E0B',
        blush: '#FDA4AF',
        cream: '#FFF7ED',
        sage: '#D1FAE5',
        coral: '#FB923C',
        teal: '#0F766E',
        warmGray: '#78716C',
      },
      fontFamily: {
        poppinsSemiBold: ['Poppins-SemiBold'],
        poppinsBold: ['Poppins-Bold'],
        interRegular: ['Inter-Regular'],
        interMedium: ['Inter-Medium'],
      },
    },
  },
  plugins: [],
};
