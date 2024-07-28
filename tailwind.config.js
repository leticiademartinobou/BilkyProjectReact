/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      minWidth: {
        "320px": "320px",
      },
    },
  },
  plugins: [],
};

// module.exports = {
//   theme: {
//     extend: {
//       minWidth: {
//         "320px": "320px",
//       },
//     },
//   },
//   variants: {},
//   plugins: [],
// };
