import { defineStore } from 'pinia'

interface ShippingZone {
  country_code: string
  country_name: string
  city: string
  zone: string
  fee: string
}

interface ProductImage {
  dossier: string
  name: string
  lien: string
}

interface ProductUser {
  id: number
  username: string
  avatar: string
  email: string
  fullname: string
  shopNameShow: string
}

interface ProductComment {
  id: number
  comment: string
  created_at: string
  user: {
    username: string
    avatar: string
  }
}

interface Product {
  id: number
  libelle: string
  description: string
  price: number
  price_str: string
  quantity: number
  free_shipping: boolean
  is_digital: boolean
  address: string
  email: string
  shipping_zone: ShippingZone[]
  images: ProductImage[]
  imageFirst: string
  isNew: boolean
  user: ProductUser
  comments: ProductComment[]
  category: {
    id: number
    libelle: string
    libelleEn: string
  }
}

interface ProductState {
  product: Product | null
  loading: boolean
  error: string | null
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    product: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchProduct(id: string) {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        const response = await fetch(`${config.public.apiBase}/${id}/products`)
        const data = await response.json()
        
        if (data.status && data.product) {
          this.product = data.product
        } else {
          throw new Error('Product not found')
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch product'
        console.error('Error fetching product:', error)
      } finally {
        this.loading = false
      }
    },

    clearProduct() {
      this.product = null
      this.error = null
    },

    resetStore() {
      this.product = null
      this.loading = false
      this.error = null
    }
  }
})
