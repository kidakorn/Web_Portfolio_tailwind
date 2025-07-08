/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#F8F8F8',
        accent: '#007BFF',
        'accent-hover': '#0056b3',
        dark: '#222222',
        'gray-text': '#666666',
        'gray-light': '#F0F0F0',
        wg: '#FFFFFF',
        bg: '#9197AE',
        gr: '#273043',
        rd: '#F02D3A',
        rdt: '#DD0426',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'prompt': ['Prompt', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        spinFaster: 'spin 1s linear infinite',
        spinSlower: 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'custom': '0 4px 20px -2px rgba(0, 123, 255, 0.1)',
        'hover': '0 8px 30px -2px rgba(0, 123, 255, 0.2)',
      },
    },
  },
  plugins: [],
}