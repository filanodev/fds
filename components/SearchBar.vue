<template>
  <div class="relative">
    <form @submit.prevent="handleSearch" class="relative">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Rechercher des produits..."
        class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        @focus="showSuggestions = true"
        @blur="hideSuggestionsDelayed"
      />
      <button 
        type="submit"
        class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-blue-600"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>

    <!-- Search Suggestions -->
    <div 
      v-if="showSuggestions && recentSearches.length > 0"
      class="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
    >
      <!-- Recent Searches -->
      <div class="p-2">
        <div class="flex items-center justify-between px-3 mb-2">
          <h3 class="text-xs font-medium text-gray-500">Recherches récentes</h3>
          <button 
            @click="clearRecentSearches" 
            class="text-xs text-blue-600 hover:text-blue-800"
          >
            Effacer
          </button>
        </div>
        <button
          v-for="search in recentSearches"
          :key="search"
          class="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
          @mousedown.prevent="selectSearch(search)"
        >
          <svg class="h-4 w-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ search }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFiltersStore } from '~/stores/filters'

const router = useRouter()
const filtersStore = useFiltersStore()

const searchQuery = ref('')
const showSuggestions = ref(false)
const recentSearches = ref([])

// Charger les recherches récentes depuis le localStorage
const loadRecentSearches = () => {
  if (process.client) {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      recentSearches.value = JSON.parse(saved)
    }
  }
}

// Sauvegarder une nouvelle recherche
const saveSearch = (query) => {
  if (!query || !process.client) return
  
  const searches = new Set([query, ...recentSearches.value])
  recentSearches.value = Array.from(searches).slice(0, 5)
  localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value))
}

// Effacer l'historique des recherches
const clearRecentSearches = () => {
  recentSearches.value = []
  if (process.client) {
    localStorage.removeItem('recentSearches')
  }
}

// Gérer la recherche
const handleSearch = () => {
  if (!searchQuery.value.trim()) return
  
  saveSearch(searchQuery.value)
  filtersStore.setSearchQuery(searchQuery.value)
  showSuggestions.value = false
  
  // Si on n'est pas sur la page d'accueil, y retourner
  if (router.currentRoute.value.path !== '/') {
    router.push('/')
  }
}

// Sélectionner une recherche depuis l'historique
const selectSearch = (search) => {
  searchQuery.value = search
  handleSearch()
}

// Cacher les suggestions avec un délai
const hideSuggestionsDelayed = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

// Charger les recherches récentes au montage
onMounted(() => {
  loadRecentSearches()
})
</script>
