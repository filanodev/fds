<template>
  <div class="space-y-6">
    <!-- Categories -->
    <div>
      <h3 class="text-lg font-medium text-gray-900 mb-4">Catégories</h3>
      <div class="space-y-2">
        <button
          class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          :class="{ 'bg-blue-50 text-blue-600': !selectedCategory }"
          @click="selectCategory('')"
        >
          Toutes les catégories
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          :class="{ 'bg-blue-50 text-blue-600': selectedCategory === category.code }"
          @click="selectCategory(category.code)"
        >
          {{ category.libelle }}
          <span class="text-xs text-gray-500 ml-1">({{ category.code }})</span>
        </button>
      </div>
    </div>

    <!-- Sort -->
    <div>
      <h3 class="text-lg font-medium text-gray-900 mb-4">Trier par</h3>
      <select
        v-model="sortBy"
        class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        @change="$emit('sort-change', sortBy)"
      >
        <option value="newest">Plus récents</option>
        <option value="oldest">Plus anciens</option>
        <option value="price_asc">Prix croissant</option>
        <option value="price_desc">Prix décroissant</option>
      </select>
    </div>

    <!-- Reset filters -->
    <button
      @click="filtersStore.resetFilters()"
      class="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
    >
      Réinitialiser les filtres
    </button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFiltersStore, categories } from '~/stores/filters'

const filtersStore = useFiltersStore()
const { selectedCategory, sortBy } = storeToRefs(filtersStore)

const selectCategory = (code: string) => {
  console.log('Selecting category:', code)
  filtersStore.setCategory(code)
}
</script>
