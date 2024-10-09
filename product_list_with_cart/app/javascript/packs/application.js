import Vue from 'vue';
import App from '../app.vue';

// Filtre global pour afficher les devises
Vue.filter('currency', function (value) {
  if (!value) return '';
  return `$${parseFloat(value).toFixed(2)}`;
});

document.addEventListener('turbolinks:load', () => {
  const appElement = document.getElementById('app');

  if (appElement) {
    new Vue({
      render: h => h(App)
    }).$mount('#app');
  } else {
    console.error("Élément #app introuvable dans le DOM.");
  }
});
