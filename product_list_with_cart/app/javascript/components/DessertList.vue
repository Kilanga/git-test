<template>
  <div class="flex flex-col md:flex-row justify-between px-6 py-8">
    <!-- Liste des desserts -->
    <div class="w-full md:w-8/12 pr-6">
      <h1 class="text-3xl font-bold mb-6 font-red-hat text-rose-900">Desserts</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="product in products"
          :key="product.name"
          class="p-4 border rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
        >
          <img
            :src="product.image.thumbnail"
            :alt="product.name"
            class="mb-4 w-full h-48 object-cover rounded-lg"
          />
          <h3 class="font-semibold text-lg font-red-hat text-rose-900 mb-1">{{ product.name }}</h3>
          <p class="text-rose-500 mb-4 font-medium">{{ product.price | currency }}</p>

          <div class="mt-auto w-full">
            <div v-if="isInCart(product)" class="flex justify-between items-center mt-4 w-full bg-red-50 p-2 rounded-full border border-red-400">
              <button
                @click="decreaseQuantity(product)"
                class="text-red-500 hover:text-white hover:bg-red-500 transition duration-200 bg-white border border-red-500 rounded-full px-2 py-1"
              >
                -
              </button>
              <span class="font-medium">{{ getCartQuantity(product) }}</span>
              <button
                @click="increaseQuantity(product)"
                class="text-red-500 hover:text-white hover:bg-red-500 transition duration-200 bg-white border border-red-500 rounded-full px-2 py-1"
              >
                +
              </button>
            </div>
            <button
              v-else
              @click="addToCart(product)"
              class="w-full mt-4 bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition text-center py-2 rounded-full flex items-center justify-center space-x-2"
            >
              <i class="fas fa-cart-plus"></i> <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Panier -->
    <div class="w-full md:w-4/12 mt-8 md:mt-0 md:ml-6">
      <Cart :cartItems="cart" @remove-item="removeFromCart" @confirm-order="confirmOrder" />
    </div>
  </div>
</template>

<script>
import data from '../data.json';
import Cart from './Cart.vue';
import Vue from 'vue';

Vue.filter('currency', function (value) {
  if (!value) return '';
  return `€${parseFloat(value).toFixed(2)}`;
});

export default {
  components: {
    Cart,
  },
  data() {
    return {
      products: data,
      cart: [],
      showConfirmation: false,
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  methods: {
    addToCart(product) {
      const existingProduct = this.findProductInCart(product);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(product) {
      const index = this.cart.findIndex(item => item.name === product.name);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
    increaseQuantity(product) {
      const existingProduct = this.findProductInCart(product);
      if (existingProduct) {
        existingProduct.quantity += 1;
      }
    },
    decreaseQuantity(product) {
      const existingProduct = this.findProductInCart(product);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          this.removeFromCart(existingProduct);
        }
      }
    },
    getCartQuantity(product) {
      const cartProduct = this.findProductInCart(product);
      return cartProduct ? cartProduct.quantity : 0;
    },
    isInCart(product) {
      return this.findProductInCart(product) !== undefined;
    },
    findProductInCart(product) {
      return this.cart.find(item => item.name === product.name);
    },
    confirmOrder() {
      this.showConfirmation = true;
    },
  },
};
</script>

<style scoped>
/* Basic styling */
</style>
