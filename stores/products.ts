import { defineStore } from 'pinia'
import { useRuntimeConfig } from '#app'

interface Image {
  dossier: string
  name: string
  lien: string
}

interface ShippingZone {
  country_code: string
  country_name: string
  city: string
  zone: string
  fee?: string
}

interface User {
  id: number
  username: string
  firstname: string
  lastname: string
  avatar: string
  shop_name: string
  fullname: string
  fullnameOrUsername: string
  hasShop: boolean
  isAdmin: boolean
  shopNameShow: string
}

interface Product {
  id: number
  pi_users_id: number
  libelle: string
  description: string
  price: number
  price_str: string
  quantity: number
  address: string
  is_digital: boolean
  status: string
  free_shipping: boolean
  images: Image[]
  country_code: string
  shipping_zone: ShippingZone[]
  free_shipping_zone: ShippingZone[]
  created_at: string
  updated_at: string
  comments_count: number
  imageFirst: string
  isNew: boolean
  shippingCountries: string[]
  freeShippingCountries: string[]
  user: User
}

interface ProductFilter {
  iso2: string
  iso3: string
  search: string
  sort_by: 'newest' | 'oldest' | 'price_asc' | 'price_desc'
  show_products_type: 'all' | 'digital' | 'physical'
  is_updated: boolean
}

interface ProductsState {
  items: Product[]
  currentPage: number
  loading: boolean
  error: string | null
  hasMore: boolean
  filters: ProductFilter
  category: string
  locale: string
}

export const useProductsStore = defineStore('products', {
  state: (): ProductsState => ({
    items: [],
    currentPage: 1,
    loading: false,
    error: null,
    hasMore: true,
    filters: {
      iso2: 'all',
      iso3: 'all',
      search: '',
      sort_by: 'newest',
      show_products_type: 'all',
      is_updated: false
    },
    category: '',
    locale: 'en'
  }),

  actions: {
    async fetchProducts(params: { search?: string } = {}) {
      if (this.loading || !this.hasMore) return

      this.loading = true
      this.error = null

      try {
        const config = useRuntimeConfig()
        const queryParams = new URLSearchParams({
          page: this.currentPage.toString(),
          search: params.search || this.filters.search,
          category: this.category,
          locale: this.locale,
          connected_user_id: '0',
          status: 'validated',
          verified_shops: '1',
          'filter[iso2]': this.filters.iso2,
          'filter[iso3]': this.filters.iso3,
          'filter[search]': params.search || this.filters.search,
          'filter[sort_by]': this.filters.sort_by,
          'filter[show_products_type]': this.filters.show_products_type,
          'filter[is_updated]': this.filters.is_updated.toString()
        })

        const response = await fetch(`${config.public.apiBase}/index-loading?${queryParams}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const data = await response.json()
        
        // Add new products to the existing list
        this.items.push(...data.products.data)
        
        // Check if there are more products to load
        this.hasMore = data.products.data.length > 0
        
        // Increment page for next fetch
        if (this.hasMore) {
          this.currentPage++
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An error occurred'
      } finally {
        this.loading = false
      }
    },

    updateFilters(newFilters: Partial<ProductFilter>) {
      this.filters = { ...this.filters, ...newFilters }
      this.resetProducts()
      this.fetchProducts()
    },

    setCategory(category: string) {
      this.category = category
      this.resetProducts()
      this.fetchProducts()
    },

    setLocale(locale: string) {
      this.locale = locale
      this.resetProducts()
      this.fetchProducts()
    },

    resetProducts() {
      this.items = []
      this.currentPage = 1
      this.hasMore = true
      this.error = null
    }
  }
})
