/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5B4FE9",
        secondary: "#8B85F0",
        accent: "#FF6B6B",
        success: "#4ECDC4",
        warning: "#FFE66D",
        info: "#4D96FF",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui"],
        body: ["Inter", "ui-sans-serif", "system-ui"],
      },
      animation: {
        'bounce-soft': 'bounce 0.6s ease-in-out',
        'scale-pop': 'scalePop 0.3s ease-out',
        'check-in': 'checkIn 0.3s ease-out',
      },
      keyframes: {
        scalePop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' }
        },
        checkIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}