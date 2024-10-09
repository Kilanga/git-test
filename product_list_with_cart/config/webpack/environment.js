// config/webpack/environment.js
const { environment } = require('@rails/webpacker');
const { VueLoaderPlugin } = require('vue-loader');
const vue = require('./loaders/vue');

// Ajout du plugin Vue Loader
environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin());
environment.loaders.prepend('vue', vue);

// Configurer PostCSS pour s'assurer qu'il utilise les bonnes versions
environment.loaders.get('css').use.find((item) => item.loader === 'postcss-loader').options = {
  postcssOptions: {
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
    ],
  },
};

module.exports = environment;
