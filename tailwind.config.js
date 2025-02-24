// Example `tailwind.config.js` file

module.exports = {
    important: true,
    content: ["./src/**/*.{js,jsx,ts,tsx}"],  // Ensure all JSX/TSX files are included
    theme: {
      fontFamily: {
        display: ['Gilroy', 'sans-serif'],
        body: ['Graphik', 'sans-serif'],
      },
      extend: {
        colors: {
          cyan: '#9cdbff',
        },
        margin: {
          '96': '24rem',
          '128': '32rem',
        },
      }
    },
    variants: {
      opacity: ['responsive', 'hover']
    }
  }