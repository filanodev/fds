<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center text-gray-600 hover:text-gray-900">
            <svg class="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
          </NuxtLink>
          <h1 class="text-xl font-bold text-gray-900 truncate max-w-md">
            {{ product?.libelle || 'Loading...' }}
          </h1>
          <div class="w-24"></div>
        </div>
      </div>
    </header>

    <!-- Product content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else-if="error" class="text-center py-8">
        <div class="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
          {{ error }}
        </div>
      </div>

      <template v-else-if="product">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <!-- Image gallery -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            <div class="space-y-4">
              <div class="relative pb-[100%] rounded-lg overflow-hidden">
                <img 
                  :src="selectedImage || product.imageFirst" 
                  :alt="product.libelle"
                  class="absolute inset-0 w-full h-full object-contain"
                >
              </div>
              <div class="grid grid-cols-4 gap-2">
                <button
                  v-for="image in product.images"
                  :key="image.lien"
                  class="relative pb-[100%] rounded-lg overflow-hidden border-2"
                  :class="selectedImage === image.lien ? 'border-blue-500' : 'border-transparent'"
                  @click="selectedImage = image.lien"
                >
                  <img 
                    :src="image.lien"
                    :alt="product.libelle"
                    class="absolute inset-0 w-full h-full object-cover hover:opacity-75 transition"
                  >
                </button>
              </div>
            </div>

            <!-- Product info -->
            <div class="space-y-6">
              <div>
                <div class="flex items-start justify-between">
                  <div>
                    <h2 class="text-2xl font-bold text-gray-900">{{ product.libelle }}</h2>
                    <p class="mt-1 text-sm text-gray-500">{{ product.description }}</p>
                  </div>
                  <div class="flex-shrink-0">
                    <button 
                      @click="toggleFavorite"
                      class="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      :class="{ 'text-red-500': isFavorite, 'text-gray-400': !isFavorite }"
                    >
                      <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Price -->
                <div class="mt-4">
                  <p class="text-3xl font-bold text-gray-900">
                    <span class="text-4xl">π</span> {{ product.price_str || formatPrice(product.price) }}
                  </p>
                  <p class="mt-1 text-sm text-gray-500">Livraison gratuite pour les commandes de plus de π 100</p>
                  <a 
                    :href="`https://mainnet.piketplace.com/#/product/${product.id}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mt-4 w-full inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Acheter sur Piketplace
                    <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>

                <!-- Seller Info -->
                <div class="mt-6 pb-6 border-b border-gray-200">
                  <div class="flex items-center space-x-2">
                    <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ product.user.username }}</p>
                      <p class="text-sm text-gray-500">{{ product.user.email }}</p>
                    </div>
                  </div>
                </div>

                <!-- Product Details -->
                <div class="mt-6">
                  <h3 class="text-lg font-medium text-gray-900">Product Details</h3>
                  <div class="mt-4 space-y-4">
                    <p class="text-gray-600">{{ product.description }}</p>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <h4 class="text-sm font-medium text-gray-900">Condition</h4>
                        <p class="mt-1 text-sm text-gray-500">{{ product.condition }}</p>
                      </div>
                      <div>
                        <h4 class="text-sm font-medium text-gray-900">Category</h4>
                        <p class="mt-1 text-sm text-gray-500">{{ product.category?.libelleEn || product.category?.libelle || 'Uncategorized' }}</p>
                      </div>
                      <div>
                        <h4 class="text-sm font-medium text-gray-900">Brand</h4>
                        <p class="mt-1 text-sm text-gray-500">{{ product.brand }}</p>
                      </div>
                      <div>
                        <h4 class="text-sm font-medium text-gray-900">Stock</h4>
                        <p class="mt-1 text-sm text-gray-500">{{ product.quantity }} available</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Comments -->
                <div v-if="product.comments?.length" class="mt-8 border-t border-gray-200 pt-8">
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Comments</h3>
                  <div class="space-y-4">
                    <div v-for="comment in product.comments" :key="comment.id" class="flex space-x-3">
                      <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ comment.user.username }}</div>
                        <div class="mt-1 text-sm text-gray-600">{{ comment.comment }}</div>
                        <div class="mt-2 text-sm text-gray-500">{{ new Date(comment.created_at).toLocaleDateString() }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '~/stores/product'
import { useAvatar } from '~/composables/useAvatar'
import { useToast } from '~/composables/useToast'

const route = useRoute()
const productStore = useProductStore()
const { getAvatarUrl } = useAvatar()
const selectedImage = ref('')
const isFavorite = ref(false)

const product = computed(() => productStore.product)
const loading = computed(() => productStore.loading)
const error = computed(() => productStore.error)

// Format price with thousand separator
const formatPrice = (price: number): string => {
  if (!price) return '0.00'
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true
  }).format(price)
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  const toast = useToast()
  if (isFavorite.value) {
    toast.success('Product added to favorites')
  }
}

// Fetch product data
onMounted(async () => {
  await productStore.fetchProduct(route.params.id as string)
})

// Clear product data when component is unmounted
onUnmounted(() => {
  productStore.clearProduct()
})
</script>
