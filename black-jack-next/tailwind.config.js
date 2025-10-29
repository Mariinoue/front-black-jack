/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    // Diz ao Tailwind para ler TODOS os ficheiros
    // dentro da pasta 'src' que terminam com estas extensões.
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
