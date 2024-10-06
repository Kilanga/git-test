<template>
  <div class="flex justify-between">
    <!-- Liste des desserts -->
    <div class="w-8/12 pr-6">
      <h1 class="text-3xl font-bold mb-6 font-red-hat text-rose-900">Desserts</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="product in products" :key="product.name" class="p-4 border rounded-lg bg-rose-50 shadow-lg">
          <img :src="product.image.thumbnail" :alt="product.name" class="mb-4 w-full h-48 object-cover rounded-lg" />
          <h3 class="font-semibold text-lg font-red-hat text-rose-900">{{ product.name }}</h3>
          <p class="text-rose-500">{{ product.price | currency }}</p>

          <div v-if="isInCart(product)">
            <!-- Affichage des boutons + et - quand l'article est ajouté au panier -->
            <div class="flex items-center space-x-4 mt-4">
              <button @click="decreaseQuantity(product)" class="bg-rose-400 text-white px-2 py-1 rounded-lg">-</button>
              <span>{{ getCartQuantity(product) }}</span>
              <button @click="increaseQuantity(product)" class="bg-rose-400 text-white px-2 py-1 rounded-lg">+</button>
            </div>
          </div>

          <button
            v-else
            @click="addToCart(product)"
            class="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-red-hat flex items-center space-x-2"
          >
            <i class="fas fa-cart-plus"></i> <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Panier -->
    <div class="w-4/12 ml-6 p-6 bg-white border rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold font-red-hat text-rose-900">Your Cart ({{ cart.length }})</h2>
      <div v-if="cart.length === 0" class="mt-6 text-center">
        <p>Your added items will appear here</p>
      </div>
      <ul v-else class="mt-4 space-y-4">
        <li v-for="item in cart" :key="item.name" class="flex justify-between items-center">
          <span>{{ item.name }} (x{{ item.quantity }})</span>
          <span>{{ item.price * item.quantity | currency }}</span>
          <button @click="removeFromCart(item)" class="text-red-500 hover:text-red-600 ml-4">Remove</button>
        </li>
      </ul>
      <button
        v-if="cart.length > 0"
        @click="showConfirmation = true"
        class="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-bold"
      >
        Confirm Order
      </button>
    </div>

    <!-- Modale de confirmation -->
    <transition name="modal">
      <div v-if="showConfirmation" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
        <div class="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 class="text-2xl font-bold mb-4">Order Confirmed</h2>
          <p class="mb-4">We hope you enjoy your food!</p>
          <ul class="mb-6">
            <li v-for="item in cart" :key="item.name" class="flex justify-between mb-2">
              <span>{{ item.name }} (x{{ item.quantity }})</span>
              <span>{{ item.price * item.quantity | currency }}</span>
            </li>
          </ul>
          <p class="font-bold text-lg mb-6">Total: {{ totalPrice | currency }}</p>
          <button
            @click="resetOrder"
            class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-bold"
          >
            Start New Order
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import data from '../data.json'

export default {
  data() {
    return {
      products: data,
      cart: [],
      showConfirmation: false
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  },
  methods: {
    addToCart(product) {
      const existingProduct = this.cart.find(item => item.name === product.name);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(product) {
      const index = this.cart.indexOf(product);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
    increaseQuantity(product) {
      const existingProduct = this.cart.find(item => item.name === product.name);
      if (existingProduct) {
        existingProduct.quantity += 1;
      }
    },
    decreaseQuantity(product) {
      const existingProduct = this.cart.find(item => item.name === product.name);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          // Si la quantité atteint 0, retirer l'article du panier
          this.removeFromCart(product);
        }
      }
    },
    getCartQuantity(product) {
      const cartProduct = this.cart.find(item => item.name === product.name);
      return cartProduct ? cartProduct.quantity : 0;
    },
    isInCart(product) {
      return this.cart.some(item => item.name === product.name);
    },
    resetOrder() {
      this.cart = [];
      this.showConfirmation = false;
    }
  }
};
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter, .modal-leave-to {
  opacity: 0;
}
</style>
