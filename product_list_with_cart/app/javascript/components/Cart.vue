<template>
  <div v-if="cartItems.length" class="p-6 bg-white border rounded-lg shadow-lg mt-4 md:mt-0">
    <h2 class="text-2xl font-bold font-red-hat text-rose-900 mb-4">Your Cart ({{ cartItems.length }})</h2>
    <ul class="space-y-4">
      <li v-for="item in cartItems" :key="item.name" class="flex justify-between items-center border-b pb-2">
        <div>
          <span class="font-bold text-sm text-rose-500">{{ item.quantity }}x</span>
          <span class="font-medium ml-2">{{ item.name }}</span>
          <span class="text-sm text-gray-500 ml-2">@ {{ item.price | currency }}</span>
        </div>
        <div class="flex items-center">
          <span class="font-medium text-rose-900">{{ (item.price * item.quantity) | currency }}</span>
          <button @click="$emit('remove-item', item)" class="ml-4 text-red-500 hover:text-red-600">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </li>
    </ul>

    <div class="mt-6">
      <div class="flex justify-between items-center mb-4">
        <span class="text-lg font-medium">Order Total</span>
        <span class="text-2xl font-bold text-rose-900">{{ totalPrice | currency }}</span>
      </div>

      <div class="flex items-center space-x-2 mb-6 text-green-600">
        <i class="fas fa-leaf"></i>
        <span class="text-sm">This is a <span class="font-bold">carbon-neutral</span> delivery</span>
      </div>

      <button
        @click="$emit('confirm-order')"
        class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-bold transition duration-200"
      >
        Confirm Order
      </button>
    </div>
  </div>
  <div v-else class="mt-6 md:mt-0 p-6 bg-gray-50 rounded-lg text-center">
    <p class="text-gray-500">Your added items will appear here</p>
  </div>
</template>

<script>
export default {
  props: ['cartItems'],
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
};
</script>

<style scoped>
/* Basic styling for the cart */
</style>
