/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        clay: {
          50: "#f7f2ee",
          100: "#efe6de",
          200: "#e1cdbd",
          300: "#cfae97",
          400: "#b98567",
          500: "#9f6547",
          600: "#7f4d35",
          700: "#613a29",
          800: "#482a1f",
          900: "#311c14"
        },
        aqua: {
          50: "#e8f6f7",
          100: "#cfecef",
          200: "#a0d9e0",
          300: "#72c5d1",
          400: "#47b3c5",
          500: "#2a95a6",
          600: "#1f7682",
          700: "#155a63",
          800: "#0c3d45",
          900: "#06262b"
        }
      },
      boxShadow: {
        soft: "0 20px 50px -30px rgba(49, 28, 20, 0.6)"
      }
    }
  },
  plugins: []
};
