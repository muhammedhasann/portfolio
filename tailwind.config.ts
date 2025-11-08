// tailwind.config.j
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */


// tailwind.config.js
module.exports = {
  // ... other configurations

  theme: {
    extend: {
            fontFamily: {
        // This line maps 'font-sans' to your roboto variable
        sans: ['var(--font-roboto)', ...fontFamily.sans],
      },
      animation: {
        // Custom animation for the terminal effect (replaces scanline.png)
        'terminal-scan': 'terminalScan 2s linear infinite',
                aurora: 'aurora 6s linear infinite',

        // Custom animation for the background noise texture (replaces noise.png)
        'background-noise': 'noise 1s steps(4) infinite',
      },
      keyframes: {
        // Keyframes for the terminal scanline effect
        aurora: {
          '0%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        terminalScan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        // Keyframes for the background noise texture
        noise: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -15%)' },
          '40%': { transform: 'translate(-5%, 15%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(20%, 0)' },
          '70%': { transform: 'translate(0, 15%)' },
          '80%': { transform: 'translate(-10%, -5%)' },
          '90%': { transform: 'translate(10%, 5%)' },
        },
      },
      // You might also want to add these for custom gradients if you plan to use them
      // Or define them directly in your CSS
      backgroundImage: {
        'noise-pattern': 'url("/noise.png")', // Keep this if you want to use a real noise.png, but we're replacing it with CSS below.
      }
    },
  },
  plugins: [],
};