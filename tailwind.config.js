/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        poppins: 'PoppinsRegular',
        poppinsMedium: 'PoppinsMedium',
        poppinsSemiBold: 'PoppinsSemiBold',
        poppinsBold: 'PoppinsBold',
        poppinsLight: 'PoppinsLight',
      },
      colors: {
        primary: '#0474ED',
        primary5: '#0474ED0D',
        secondary: '#5B62FF',
        tertiary: '#EAB632',
        black: '#13171B',
        gray500: '#A1A4A7',
        light500: '#D9E1E1',
        white: '#FFFFFF',
        light: {
          text: '#11181C',
          background: '#FFFFFF',
          tint: '#0474ED', // Usando primary como exemplo
          icon: '#13171B',
          tabIconDefault: '#687076',
          tabIconSelected: '#0474ED', // Usando primary como exemplo
        },
        dark: {
          text: '#ECEDEE',
          background: '#151718',
          tint: '#5B62FF', // Usando secondary como exemplo
          icon: '#9BA1A6',
          tabIconDefault: '#9BA1A6',
          tabIconSelected: '#5B62FF', // Usando secondary como exemplo
        },
      },
    },
  },
  plugins: [],
};
