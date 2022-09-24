/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D2639',
      },
      fontFamily: {
        NunitoRegular: 'Nunito-Regular',
        NunitoBold: 'Nunito-Bold',
        PoppinsRegular: 'Poppins-Regular',
        PoppinsMedium: 'Poppins-Medium',
        PoppinsBold: 'Poppins-Bold',
      }
    },
  },
  plugins: [],
}
