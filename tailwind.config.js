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
        // Soft blush pink theme
        pinkBg: '#FFF0F5',
        pinkLight: '#FFE4EC',
        pinkMedium: '#FFB6C1',
        pinkAccent: '#FF69B4',
        // Duolingo-style button colors
        btn: {
          green: '#58CC02',
          greenShadow: '#58A700',
          blue: '#1CB0F6',
          blueShadow: '#1899D6',
          red: '#FF4B4B',
          redShadow: '#EA2B2B',
          orange: '#FF9600',
          orangeShadow: '#E08600',
          purple: '#CE82FF',
          purpleShadow: '#B86EE0',
          gray: '#E5E5E5',
          grayShadow: '#AFAFAF',
          white: '#FFFFFF',
          whiteShadow: '#E5E5E5',
        },
      },
      fontFamily: {
        poppinsSemiBold: ['Poppins-SemiBold'],
        poppinsBold: ['Poppins-Bold'],
        interRegular: ['Inter-Regular'],
        interMedium: ['Inter-Medium'],
        bricolageRegular: ['BricolageGrotesque-Regular'],
        bricolageSemiBold: ['BricolageGrotesque-SemiBold'],
        bricolageBold: ['BricolageGrotesque-Bold'],
      },
    },
  },
  plugins: [],
};
