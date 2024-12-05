<template>
  <div class="min-h-screen bg-white md:bg-gray-50 px-4 py-6 md:py-12">
    <div class="max-w-lg mx-auto">
      <div class="bg-white md:shadow md:rounded-2xl">
        <div class="p-6 md:p-8">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          
          <div v-if="cartItems.length > 0">
            <!-- Cart Items -->
            <div class="space-y-6 mb-8">
              <div 
                v-for="item in cartItems" 
                :key="item.id"
                class="flex space-x-4"
              >
                <!-- Product Image -->
                <div class="w-24 h-24 flex-shrink-0 rounded-xl bg-gray-100 overflow-hidden">
                  <img 
                    :src="item.image"
                    :alt="item.name"
                    class="h-full w-full object-cover"
                  />
                </div>

                <!-- Product Details -->
                <div class="flex-1 min-w-0">
                  <h3 class="font-medium text-gray-900 mb-1 truncate">{{ item.name }}</h3>
                  <p class="text-gray-600 mb-2">π{{ item.price }}</p>
                  
                  <!-- Quantity Controls -->
                  <div class="flex items-center space-x-2">
                    <button 
                      class="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300"
                      @click="updateQuantity(item.id, item.quantity - 1)"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <span class="w-8 text-center">{{ item.quantity }}</span>
                    <button 
                      class="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-gray-300"
                      @click="updateQuantity(item.id, item.quantity + 1)"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Remove Button -->
                <button 
                  class="text-gray-400 hover:text-gray-500"
                  @click="removeItem(item.id)"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Cart Summary -->
            <div class="border-t pt-6 space-y-4">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>π{{ subtotal }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>π{{ shipping }}</span>
              </div>
              <div class="flex justify-between text-lg font-medium text-gray-900">
                <span>Total</span>
                <span>π{{ total }}</span>
              </div>

              <!-- Checkout Button -->
              <button 
                class="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200"
                @click="checkout"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

          <!-- Empty Cart -->
          <div 
            v-else
            class="text-center py-12"
          >
            <svg 
              class="h-12 w-12 text-gray-400 mx-auto mb-4"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
            <p class="text-gray-600 mb-6">Add some items to your cart to checkout</p>
            <NuxtLink
              to="/"
              class="inline-flex items-center justify-center px-6 py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Continue Shopping
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Sample cart items (should come from store)
const cartItems = ref([
  {
    id: 1,
    name: 'Wireless Headphones',
    price: '99.99',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: '199.99',
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
  }
])

// Computed values
const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (parseFloat(item.price) * item.quantity)
  }, 0).toFixed(2)
})

const shipping = ref('10.00')
const total = computed(() => {
  return (parseFloat(subtotal.value) + parseFloat(shipping.value)).toFixed(2)
})

// Methods
const updateQuantity = (id, quantity) => {
  if (quantity < 1) return
  const item = cartItems.value.find(item => item.id === id)
  if (item) {
    item.quantity = quantity
  }
}

const removeItem = (id) => {
  const index = cartItems.value.findIndex(item => item.id === id)
  if (index !== -1) {
    cartItems.value.splice(index, 1)
  }
}

const checkout = () => {
  // Implement checkout logic
  console.log('Proceeding to checkout...')
}
</script>
