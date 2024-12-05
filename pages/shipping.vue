<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-5xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Available Deliveries</h1>
        <p class="mt-2 text-gray-600">Select a delivery to manage shipping details</p>
      </div>
    
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Order Card -->
        <div v-for="order in orders" 
             :key="order.id" 
             class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 flex flex-col">
          <!-- Product Image -->
          <div class="relative aspect-square">
            <img 
              :src="order.product?.imageFirst || getProductImage(order.products_id)" 
              :alt="order.libelle"
              class="w-full h-full object-cover rounded-t-xl"
              @error="handleImageError"
            >
            <div class="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-full shadow-sm">
              <p class="text-lg font-bold text-blue-600">π {{ order.price }}</p>
            </div>
          </div>
          
          <!-- Product Details -->
          <div class="p-4 flex-1 flex flex-col">
            <!-- Product Name -->
            <h2 class="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">{{ order.libelle }}</h2>

            <!-- Shipping Route -->
            <div class="bg-gray-50 rounded-lg p-3 mb-4">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center">
                  <span class="text-2xl mr-2">{{ order.product?.country?.emoji }}</span>
                  <div class="flex flex-col">
                    <span class="text-xs font-medium text-gray-500">From</span>
                    <span class="text-sm text-gray-900">{{ order.product?.city }}</span>
                  </div>
                </div>
                <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                <div class="flex items-center">
                  <div class="flex flex-col items-end">
                    <span class="text-xs font-medium text-gray-500">To</span>
                    <span class="text-sm text-gray-900">{{ order.pre_order_address.city }}</span>
                  </div>
                  <span class="text-2xl ml-2">{{ order.preOrderCountry?.emoji }}</span>
                </div>
              </div>
            </div>

            <!-- Addresses -->
            <div class="space-y-3 text-sm mb-4">
              <div class="bg-gray-50 rounded-lg p-3">
                <p class="font-medium text-gray-900 mb-1">Pickup Address</p>
                <p class="text-gray-600 break-words text-sm">{{ order.product?.address }}</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-3">
                <p class="font-medium text-gray-900 mb-1">Delivery Address</p>
                <p class="text-gray-600 mb-1 text-sm">{{ order.pre_order_address.name }}</p>
                <p class="text-gray-600 break-words text-sm">{{ order.pre_order_address.address }}</p>
              </div>
            </div>

            <!-- Action Button -->
            <div class="mt-auto">
              <a 
                v-if="!order.hasDeliver" 
                :href="'https://mainnet.piketplace.com/#/shippings'"
                target="_blank"
                class="flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 gap-2"
              >
                Accept Delivery
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Infinite Scroll Trigger and Loading State -->
      <div class="mt-6">
        <div ref="infiniteScrollTrigger" class="h-4 w-full"></div>
        <div v-if="loading" class="flex justify-center py-4">
          <div class="flex items-center space-x-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span class="text-gray-600">Loading more deliveries...</span>
          </div>
        </div>
        <div v-if="!hasMore && orders.length > 0" class="text-center py-4 text-gray-600">
          No more deliveries to load
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Country {
  emoji: string
}

interface Product {
  address: string
  city: string
  country: Country
  imageFirst: string
  id: number
}

interface Address {
  name: string
  city: string
  address: string
}

interface Order {
  id: number
  libelle: string
  price: number
  products_id: number
  pre_order_address: Address
  preOrderCountry: Country
  hasDeliver: boolean
  product: Product
}

const orders = ref<Order[]>([])
const currentPage = ref(1)
const loading = ref(false)
const hasMore = ref(true)
const infiniteScrollTrigger = ref<HTMLElement | null>(null)

const getProductImage = (productId: number) => {
  return `https://mainnet-backend.piketplace.com/storage/products/${productId}/image_1.png`
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/placeholder-image.png'
}

const loadOrders = async (page: number = 1) => {
  if (loading.value || !hasMore.value) return

  loading.value = true
  try {
    const response = await fetch(
      `https://mainnet-backend.piketplace.com/api/v1/line-orders-shipping?user_applicant_id=&without_deliver=1&page=${page}&from_country_code=&to_country_code=`
    )
    if (!response.ok) throw new Error('Failed to load orders')
    
    const data = await response.json()
    
    if (data.line_orders?.data) {
      if (page === 1) {
        orders.value = data.line_orders.data
      } else {
        orders.value = [...orders.value, ...data.line_orders.data]
      }
      
      hasMore.value = page < data.line_orders.last_page
      currentPage.value = data.line_orders.current_page
    } else {
      hasMore.value = false
    }
  } catch (error) {
    console.error('Error loading orders:', error)
  } finally {
    loading.value = false
  }
}

// Setup Intersection Observer
let observer: IntersectionObserver | null = null

const setupIntersectionObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !loading.value && hasMore.value) {
        loadOrders(currentPage.value + 1)
      }
    },
    {
      rootMargin: '200px',
      threshold: 0.1
    }
  )

  if (infiniteScrollTrigger.value) {
    observer.observe(infiniteScrollTrigger.value)
  }
}

onMounted(() => {
  loadOrders()
  setupIntersectionObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>