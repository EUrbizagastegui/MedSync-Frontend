/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // Desactiva la normalización de estilos de Tailwind (Preflight)
  },
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

