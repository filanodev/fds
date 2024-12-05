<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-[2000px] mx-auto px-4 sm:px-6 py-8">
      <!-- Loading Skeleton -->
      <div v-if="isLoading && products.length === 0" 
           class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
        <div v-for="n in 12" :key="n" 
             class="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
          <div class="aspect-square bg-gray-200"></div>
          <div class="p-4">
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-else>
        <!-- Error Message -->
        <div v-if="error" 
             class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ error }}
          </div>
        </div>

        <!-- Products -->
        <div v-if="products.length > 0" 
             class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- No Products Found -->
        <div v-else-if="!isLoading" 
             class="text-center py-12 px-4 bg-white rounded-xl shadow-sm">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">Aucun produit trouvé</h3>
          <p class="mt-2 text-gray-500">Essayez de modifier vos critères de recherche</p>
        </div>

        <!-- Loading More Indicator -->
        <div v-if="isLoading" class="flex justify-center py-8">
          <div class="flex items-center space-x-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span class="text-gray-600">Chargement des produits...</span>
          </div>
        </div>

        <!-- End of Results -->
        <div v-if="!hasMore && products.length > 0" 
             class="text-center py-8 text-gray-500">
          Vous avez vu tous les produits disponibles
        </div>

        <!-- Infinite Scroll Trigger -->
        <div ref="infiniteScrollTrigger" class="h-4 w-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import ProductCard from './ProductCard.vue'
import { useFiltersStore } from '~/stores/filters'

const route = useRoute()
const products = ref<any[]>([])
const page = ref(1)
const isLoading = ref(false)
const hasMore = ref(true)
const error = ref('')
const infiniteScrollTrigger = ref<HTMLElement | null>(null)

// Get filters from store
const filtersStore = useFiltersStore()
const { selectedCategory, searchQuery, sortBy } = storeToRefs(filtersStore)

// Watch for URL changes
watch(
  () => route.query.category,
  (newCategory) => {
    if (newCategory) {
      filtersStore.setCategory(newCategory.toString())
    } else {
      filtersStore.setCategory(null)
    }
  },
  { immediate: true }
)

const fetchProducts = async (resetPage = false) => {
  if (isLoading.value || (!hasMore.value && !resetPage)) return

  if (resetPage) {
    page.value = 1
    products.value = []
    hasMore.value = true
  }

  isLoading.value = true
  error.value = ''

  try {
    const params = new URLSearchParams({
      page: page.value.toString(),
      search: searchQuery.value || '',
      category: selectedCategory.value || '',
      locale: 'en',
      connected_user_id: '0',
      status: 'validated',
      verified_shops: '1',
      'filter[iso2]': 'all',
      'filter[iso3]': 'all',
      'filter[search]': searchQuery.value || '',
      'filter[sort_by]': sortBy.value || 'newest',
      'filter[show_products_type]': 'all',
      'filter[is_updated]': 'false'
    })

    const response = await fetch(`https://mainnet-backend.piketplace.com/api/v1/index-loading?${params.toString()}`)
    if (!response.ok) throw new Error('Erreur lors du chargement des produits')
    
    const data = await response.json()
    
    if (data.products?.data) {
      if (page.value === 1) {
        products.value = data.products.data
      } else {
        products.value = [...products.value, ...data.products.data]
      }
      
      hasMore.value = data.products.current_page < data.products.last_page
      if (hasMore.value) {
        page.value++
      }
    } else {
      hasMore.value = false
    }
  } catch (err: any) {
    console.error('Error fetching products:', err)
    error.value = err.message || 'Une erreur est survenue lors du chargement des produits'
    hasMore.value = false
  } finally {
    isLoading.value = false
  }
}

// Reset and reload when filters change
watch([selectedCategory, searchQuery, sortBy], () => {
  fetchProducts(true)
}, { deep: true })

let observer: IntersectionObserver | null = null

const setupIntersectionObserver = () => {
  if (observer) {
    observer.disconnect()
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !isLoading.value && hasMore.value) {
        fetchProducts()
      }
    },
    {
      rootMargin: '100px',
      threshold: 0.1
    }
  )

  if (infiniteScrollTrigger.value) {
    observer.observe(infiniteScrollTrigger.value)
  }
}

onMounted(async () => {
  await fetchProducts(true)
  nextTick(() => {
    setupIntersectionObserver()
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>
