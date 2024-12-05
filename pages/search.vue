<template>
  <div class="min-h-screen bg-white md:bg-gray-50 px-4 py-6 md:py-12">
    <div class="max-w-6xl mx-auto">
      <!-- Search Header -->
      <div class="mb-8">
        <div class="relative">
          <input 
            type="text"
            v-model="searchQuery"
            placeholder="Search products..."
            class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200"
            @keyup.enter="search"
          />
          <svg 
            class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Filters -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="md:col-span-1">
          <div class="bg-white md:shadow md:rounded-2xl p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
            
            <!-- Categories -->
            <div class="mb-6">
              <h3 class="font-medium text-gray-700 mb-2">Categories</h3>
              <div class="space-y-2">
                <label 
                  v-for="category in categories" 
                  :key="category.id"
                  class="flex items-center space-x-2"
                >
                  <input 
                    type="checkbox"
                    :value="category.slug"
                    v-model="selectedCategories"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="text-gray-600">{{ category.name }}</span>
                </label>
              </div>
            </div>

            <!-- Price Range -->
            <div class="mb-6">
              <h3 class="font-medium text-gray-700 mb-2">Price Range</h3>
              <div class="space-y-2">
                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <label class="text-sm text-gray-500">Min</label>
                    <input 
                      type="number"
                      v-model="priceRange.min"
                      class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label class="text-sm text-gray-500">Max</label>
                    <input 
                      type="number"
                      v-model="priceRange.max"
                      class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Sort -->
            <div>
              <h3 class="font-medium text-gray-700 mb-2">Sort By</h3>
              <select 
                v-model="sortBy"
                class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="relevance">Relevance</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="md:col-span-3">
          <div class="bg-white md:shadow md:rounded-2xl p-6">
            <!-- Results Header -->
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-gray-900">
                {{ searchResults.length }} Results
              </h2>
              <button 
                class="md:hidden px-4 py-2 text-gray-600 border border-gray-200 rounded-lg"
                @click="showFilters = true"
              >
                Filters
              </button>
            </div>

            <!-- Results Grid -->
            <div v-if="searchResults.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <NuxtLink
                v-for="product in searchResults"
                :key="product.id"
                :to="`/product/${product.id}`"
                class="group"
              >
                <div class="aspect-square rounded-xl bg-gray-100 overflow-hidden mb-2">
                  <img 
                    :src="product.image"
                    :alt="product.name"
                    class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 class="font-medium text-gray-900 mb-1 truncate">{{ product.name }}</h3>
                <p class="text-gray-600">π{{ product.price }}</p>
              </NuxtLink>
            </div>

            <!-- No Results -->
            <div v-else class="text-center py-12">
              <svg 
                class="h-12 w-12 text-gray-400 mx-auto mb-4"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="text-lg font-medium text-gray-900 mb-1">No Results Found</h3>
              <p class="text-gray-600">Try adjusting your search or filters</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Filters Dialog -->
    <div 
      v-if="showFilters"
      class="fixed inset-0 z-50 md:hidden"
      @click="showFilters = false"
    >
      <div class="absolute inset-0 bg-black/50"></div>
      <div 
        class="absolute inset-y-0 right-0 w-full max-w-xs bg-white"
        @click.stop
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold text-gray-900">Filters</h2>
            <button 
              class="text-gray-400 hover:text-gray-500"
              @click="showFilters = false"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Mobile Filters Content -->
          <div class="space-y-6">
            <!-- Categories -->
            <div>
              <h3 class="font-medium text-gray-700 mb-2">Categories</h3>
              <div class="space-y-2">
                <label 
                  v-for="category in categories" 
                  :key="category.id"
                  class="flex items-center space-x-2"
                >
                  <input 
                    type="checkbox"
                    :value="category.slug"
                    v-model="selectedCategories"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="text-gray-600">{{ category.name }}</span>
                </label>
              </div>
            </div>

            <!-- Price Range -->
            <div>
              <h3 class="font-medium text-gray-700 mb-2">Price Range</h3>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="text-sm text-gray-500">Min</label>
                  <input 
                    type="number"
                    v-model="priceRange.min"
                    class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label class="text-sm text-gray-500">Max</label>
                  <input 
                    type="number"
                    v-model="priceRange.max"
                    class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <!-- Sort -->
            <div>
              <h3 class="font-medium text-gray-700 mb-2">Sort By</h3>
              <select 
                v-model="sortBy"
                class="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="relevance">Relevance</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            <!-- Apply Filters Button -->
            <button 
              class="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200"
              @click="applyFilters"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const searchQuery = ref('')
const selectedCategories = ref([])
const priceRange = ref({ min: '', max: '' })
const sortBy = ref('relevance')
const showFilters = ref(false)

// Sample categories (should come from API)
const categories = [
  { id: 1, name: 'Electronics', slug: 'electronics' },
  { id: 2, name: 'Fashion', slug: 'fashion' },
  { id: 3, name: 'Home & Living', slug: 'home' },
  { id: 4, name: 'Sports & Outdoors', slug: 'sports' },
  { id: 5, name: 'Beauty & Health', slug: 'beauty' }
]

// Sample search results (should come from API)
const searchResults = ref([
  {
    id: 1,
    name: 'Wireless Headphones',
    price: '99.99',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: '199.99',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
  }
])

const search = () => {
  // Implement search logic
  console.log('Searching...', {
    query: searchQuery.value,
    categories: selectedCategories.value,
    priceRange: priceRange.value,
    sortBy: sortBy.value
  })
}

const applyFilters = () => {
  showFilters.value = false
  search()
}

// Watch for route query changes
const route = useRoute()
watch(() => route.query, (newQuery) => {
  if (newQuery.q) {
    searchQuery.value = newQuery.q
    search()
  }
  if (newQuery.category) {
    selectedCategories.value = [newQuery.category]
    search()
  }
}, { immediate: true })
</script>
