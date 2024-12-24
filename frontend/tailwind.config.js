/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('/public/bg.avif')",
        'add-bg': "url('/public/bgAdd.avif')",
        'edit-bg': "url('/public/bgEdit.avif')"
      }
    },
  },
  plugins: [],
}

