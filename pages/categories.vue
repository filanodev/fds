<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-8">All Categories</h1>
      
      <div class="space-y-4">
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          @click.prevent="selectCategory(category)"
          :to="`/`"
          class="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
        >
          <div class="p-4 flex items-center space-x-4">
            <div class="flex-shrink-0 w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center">
              <div class="text-gray-900">
                <i v-for="icon in category.icons.split(';')" 
                   :key="icon" 
                   :class="icon + ' text-2xl'"
                ></i>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <h2 class="text-lg font-medium text-gray-900 truncate">{{ category.libelleEn }}</h2>
              <p class="text-sm text-gray-500">{{ category.description }}</p>
            </div>
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFiltersStore } from '~/stores/filters'
import { useRouter } from 'vue-router'

const router = useRouter()
const filtersStore = useFiltersStore()

interface Category {
  id: number
  code: string
  libelle: string
  libelleEn: string
  description: string
  img: string
  icons: string
  deleted_at: string | null
  created_at: string
  updated_at: string
}

const selectCategory = (category: Category) => {
  filtersStore.setCategory(category.id.toString())
  router.push({
    path: '/',
    query: { category: category.id.toString() }
  })
}

const categories: Category[] = [
  {
    id: 1,
    code: "V3",
    libelle: "Véhicules",
    libelleEn: "Vehicles",
    description: "Cars, motorcycles, and other vehicles",
    img: "travelling-vehicles-of-a-road.png",
    icons: "fas fa-motorcycle;fas fa-car",
    deleted_at: null,
    created_at: "2022-06-29T13:02:20.000000Z",
    updated_at: "2022-06-29T13:02:20.000000Z"
  },
  {
    id: 2,
    code: "E56",
    libelle: "Electronique",
    libelleEn: "Electronics",
    description: "Phones, computers, and gadgets",
    img: "mobile-phone-and-television-screen.png",
    icons: "fa fa-mobile;fa fa-laptop",
    deleted_at: null,
    created_at: "2022-06-29T13:03:23.000000Z",
    updated_at: "2022-06-29T13:03:23.000000Z"
  },
  {
    id: 3,
    code: "Immo9",
    libelle: "Immobilier",
    libelleEn: "Real Estate",
    description: "Houses, apartments, and properties",
    img: "immobilier.png",
    icons: "fas fa-building;fas fa-home",
    deleted_at: null,
    created_at: "2022-06-29T13:04:27.000000Z",
    updated_at: "2022-06-29T13:04:27.000000Z"
  },
  {
    id: 4,
    code: "Ele01",
    libelle: "Electroménager",
    libelleEn: "Home & Garden",
    description: "Furniture, decor, and garden tools",
    img: "appareils-electriques.png",
    icons: "fas fa-fan;fas fa-tv;fas fa-door-closed",
    deleted_at: null,
    created_at: "2022-06-29T13:05:28.000000Z",
    updated_at: "2022-06-29T13:05:28.000000Z"
  },
  {
    id: 5,
    code: "SPL",
    libelle: "Sport et loisir",
    libelleEn: "Sports",
    description: "Sports equipment and accessories",
    img: "des-sports.png",
    icons: "fas fa-football-ball;fas fa-quidditch",
    deleted_at: null,
    created_at: "2022-06-29T13:06:46.000000Z",
    updated_at: "2022-06-29T13:06:46.000000Z"
  },
  {
    id: 6,
    code: "VE",
    libelle: "Vêtement",
    libelleEn: "Fashion",
    description: "Clothing, shoes, and accessories",
    img: "secher.png",
    icons: "fas fa-shirt;fas fa-socks",
    deleted_at: null,
    created_at: "2022-06-29T13:07:34.000000Z",
    updated_at: "2022-06-29T13:07:34.000000Z"
  },
  {
    id: 7,
    code: "P2",
    libelle: "Foodstuffs",
    libelleEn: "Foodstuffs",
    description: "Food and beverages",
    img: "diet.png",
    icons: "fas fa-apple-alt;fas fa-hamburger",
    deleted_at: null,
    created_at: "2022-06-29T13:08:37.000000Z",
    updated_at: "2022-06-29T13:08:37.000000Z"
  },
  {
    id: 8,
    code: "Oth",
    libelle: "Autres",
    libelleEn: "Toys & Games",
    description: "Toys, games, and entertainment",
    img: "unknown.png",
    icons: "fa fa-question-circle",
    deleted_at: null,
    created_at: "2022-06-29T13:09:17.000000Z",
    updated_at: "2022-06-29T13:09:17.000000Z"
  },
  {
    id: 9,
    code: "an",
    libelle: "animals",
    libelleEn: "Pets",
    description: "Pet supplies and accessories",
    img: "cat.png",
    icons: "fas fa-dog;fas fa-dove",
    deleted_at: null,
    created_at: "2022-06-29T13:09:53.000000Z",
    updated_at: "2022-06-29T13:09:53.000000Z"
  },
  {
    id: 10,
    code: "digital_courses",
    libelle: "digital_courses",
    libelleEn: "Books & Media",
    description: "Books, movies, and music",
    img: "online-learning.png",
    icons: "fas fa-book-reader;fas fa-chalkboard",
    deleted_at: null,
    created_at: "2022-06-29T13:09:53.000000Z",
    updated_at: "2022-06-29T13:09:53.000000Z"
  }
]
</script>

<style scoped>
.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 1rem;
}
</style>
