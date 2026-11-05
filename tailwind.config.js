/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#102a43',
        muted: '#5f7388',
        brand: { 50: '#eef7ff', 100: '#d9edff', 200: '#b9dcf7', 500: '#2479b9', 600: '#0f5f9b', 700: '#0f4c81', 800: '#103f68' },
        accent: { 50: '#edfdf5', 500: '#24a36a', 600: '#178454' },
        violet: { 50: '#f5f3ff', 100: '#ede9fe', 500: '#7c5ce7', 600: '#6842d9' },
        cyan: { 50: '#ecfeff', 100: '#cffafe', 500: '#089fb5', 600: '#087f91' },
        coral: { 50: '#fff1f2', 100: '#ffe4e6', 500: '#f05d75', 600: '#dc405c' },
        amberx: { 50: '#fffbeb', 100: '#fef3c7', 500: '#e9a008', 600: '#c77d05' }
      },
      fontFamily: { sans: ['Inter', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      boxShadow: { soft: '0 18px 48px -22px rgba(31,65,114,.3)', card: '0 12px 34px -22px rgba(31,65,114,.25)' }
    }
  },
  plugins: []
}
