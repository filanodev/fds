import { ref, computed } from 'vue'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  price_str: string
  image_url: string
  category: string
  shop: {
    id: number
    name: string
    avatar_url: string
  }
}

export interface ProductsResponse {
  data: Product[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export function useProducts() {
  const config = useRuntimeConfig()
  const loading = ref(false)
  const error = ref<string | null>(null)
  const products = ref<Product[]>([])
  const currentPage = ref(1)
  const lastPage = ref(1)
  const searchQuery = ref('')
  const selectedCategory = ref('')

  const hasMore = computed(() => currentPage.value < lastPage.value)

  async function fetchProducts(page = 1, reset = false) {
    if (loading.value) return

    try {
      loading.value = true
      error.value = null

      const queryParams = new URLSearchParams({
        page: page.toString(),
        search: searchQuery.value,
        category: selectedCategory.value,
        ...config.public.defaultParams,
      })

      const response = await fetch(`${config.public.apiBase}/index-loading?${queryParams}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data: ProductsResponse = await response.json()

      if (reset) {
        products.value = data.data
      } else {
        products.value = [...products.value, ...data.data]
      }

      currentPage.value = data.meta.current_page
      lastPage.value = data.meta.last_page
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred while fetching products'
    } finally {
      loading.value = false
    }
  }

  function resetSearch() {
    searchQuery.value = ''
    selectedCategory.value = ''
    currentPage.value = 1
    products.value = []
    fetchProducts(1, true)
  }

  async function searchProducts(query: string) {
    searchQuery.value = query
    currentPage.value = 1
    await fetchProducts(1, true)
  }

  async function filterByCategory(category: string) {
    selectedCategory.value = category
    currentPage.value = 1
    await fetchProducts(1, true)
  }

  async function loadMore() {
    if (hasMore.value && !loading.value) {
      await fetchProducts(currentPage.value + 1)
    }
  }

  return {
    products,
    loading,
    error,
    hasMore,
    searchQuery,
    selectedCategory,
    fetchProducts,
    searchProducts,
    filterByCategory,
    loadMore,
    resetSearch
  }
}
