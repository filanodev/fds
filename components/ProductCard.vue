<template>
  <NuxtLink 
    :to="`/product/${product.id}`" 
    class="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full"
  >
    <!-- Product Image -->
    <div class="relative aspect-square overflow-hidden bg-gray-100">
      <img 
        :src="productImage" 
        :alt="product.libelle"
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        @error="handleImageError"
      />
      <div 
        class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>
      <div v-if="product.free_shipping" 
           class="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
        Free Shipping
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4 flex-1 flex flex-col">
      <div class="flex-1">
        <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem]">
          {{ product.libelle }}
        </h3>
        
        <!-- Price and Country -->
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-baseline gap-2">
            <p class="text-lg font-bold text-gray-900">
              <span class="text-xl">π</span> {{ product.price_str || formatPrice(product.price) }}
            </p>
          </div>
          <div v-if="product.country_code" class="text-lg" :title="product.country_code.toUpperCase()">
            {{ getCountryFlag(product.country_code) }}
          </div>
        </div>

        <!-- Location -->
        <p v-if="product.address" class="text-sm text-gray-600 mb-2 flex items-center">
          <svg class="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span class="truncate">{{ product.address }}</span>
        </p>

        <!-- Comments count -->
        <div v-if="product.comments_count" class="text-sm text-gray-500 mb-2 flex items-center">
          <svg class="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          {{ product.comments_count }} comment{{ product.comments_count > 1 ? 's' : '' }}
        </div>
      </div>

      <!-- Seller Info -->
      <div class="pt-3 border-t border-gray-100 mt-auto">
        <div class="flex items-center">
          <img 
            :src="sellerAvatar"
            :alt="sellerName"
            class="w-6 h-6 rounded-full mr-2 object-cover"
            @error="handleAvatarError"
          />
          <span class="text-sm text-gray-600 truncate flex-1">{{ sellerName }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Product {
  id: number
  libelle: string
  price: number
  price_str?: string
  address?: string
  free_shipping: boolean
  comments_count?: number
  images: Array<{
    dossier: string
    name: string
    lien: string
  }>
  user: {
    fullname?: string
    avatar?: string
    shopNameShow?: string
    username?: string
  }
  country_code?: string
}

const props = defineProps<{
  product: Product
}>()

const imageError = ref(false)
const avatarError = ref(false)

// Format price with thousand separator
const formatPrice = (price: number): string => {
  if (!price) return '0.00'
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true
  }).format(price)
}

function getCountryFlag(countryCode: string) {
  if (!countryCode) return ''
  return countryCode
    .toUpperCase()
    .split('')
    .map(char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    .join('')
}

const productImage = computed(() => {
  if (imageError.value) return 'https://via.placeholder.com/300'
  if (props.product.images && props.product.images.length > 0) {
    return props.product.images[0].lien
  }
  return `https://mainnet-backend.piketplace.com/storage/products/${props.product.id}/image_1.png`
})

const sellerName = computed(() => {
  const user = props.product.user
  return user.shopNameShow || user.fullname || user.username || 'Seller'
})

const sellerAvatar = computed(() => {
  if (avatarError.value) return 'https://via.placeholder.com/100'
  return props.product.user.avatar || 'https://via.placeholder.com/100'
})

const handleImageError = () => {
  imageError.value = true
}

const handleAvatarError = () => {
  avatarError.value = true
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.group:hover .group-hover\:scale-105 {
  --tw-scale-x: 1.05;
  --tw-scale-y: 1.05;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
</style>
