import { defineStore } from 'pinia'
import { useProductStore } from './product'

export interface Category {
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

export const categories: Category[] = [
  {
    id: 1,
    code: "V3",
    libelle: "Véhicules",
    libelleEn: "vehicles",
    description: "vehicles",
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
    libelleEn: "Electronic",
    description: "Electronic",
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
    libelleEn: "Real estate",
    description: "Immobilier",
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
    libelleEn: "Home appliance",
    description: "Electroménager",
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
    libelleEn: "Sport and leisure",
    description: "Sport and leisure",
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
    libelleEn: "Vêtement",
    description: "Vêtement",
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
    description: "Foodstuffs",
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
    libelleEn: "Autres",
    description: "Autres",
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
    libelleEn: "animals",
    description: "animals",
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
    libelleEn: "digital_courses",
    description: "digital/courses",
    img: "online-learning.png",
    icons: "fas fa-book-reader;fas fa-chalkboard",
    deleted_at: null,
    created_at: "2022-06-29T13:09:53.000000Z",
    updated_at: "2022-06-29T13:09:53.000000Z"
  }
]

interface FiltersState {
  selectedCategory: string | null
  searchQuery: string
  sortBy: string
}

export const useFiltersStore = defineStore('filters', {
  state: (): FiltersState => ({
    selectedCategory: null,
    searchQuery: '',
    sortBy: 'newest'
  }),

  actions: {
    setCategory(categoryId: string | null) {
      this.selectedCategory = categoryId
      const productStore = useProductStore()
      productStore.resetStore()
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
      const productStore = useProductStore()
      productStore.resetStore()
    },

    setSortBy(sort: string) {
      this.sortBy = sort
      const productStore = useProductStore()
      productStore.resetStore()
    },

    resetFilters() {
      this.selectedCategory = null
      this.searchQuery = ''
      this.sortBy = 'newest'
      const productStore = useProductStore()
      productStore.resetStore()
    }
  }
})
