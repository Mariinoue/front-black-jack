// /** @type {import('postcss').Config} */
// module.exports = {
//   plugins: {
//     '@tailwindcss/postcss': {}, // Use o novo pacote aqui
//     autoprefixer: {},
//   },
// }

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {}
  },
}

export default config