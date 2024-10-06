<template>
  <div v-if="cartItems.length" class="mt-6 p-4 bg-gray-50 rounded-lg">
    <h2 class="font-bold">Your Cart ({{ cartItems.length }} items)</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.name" class="flex justify-between">
        <span>{{ item.name }}</span>
        <span>{{ item.quantity }} x {{ item.price | currency }}</span>
        <button @click="$emit('remove-item', item)" class="text-red-500 hover:text-red-600">Remove</button>
      </li>
    </ul>
    <button @click="$emit('confirm-order')" class="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg">
      Confirm Order
    </button>
  </div>
</template>

<script>
export default {
  props: ['cartItems']
}
</script>

<style scoped>
/* Style basique pour le panier */
</style>
