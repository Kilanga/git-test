// tailwind.config.js
module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.vue',
    './app/javascript/**/*.js',
    './app/assets/**/*.css'  // Inclus le chemin des fichiers CSS
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
