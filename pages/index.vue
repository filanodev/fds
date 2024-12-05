<template>
  <div>
    <ProductGrid />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'
import { useRoute } from 'vue-router'
import { useFiltersStore } from '~/stores/filters'
import ProductGrid from '~/components/ProductGrid.vue'

const route = useRoute()
const filtersStore = useFiltersStore()

// Récupérer la catégorie depuis l'URL si présente
if (route.query.category) {
  filtersStore.setCategory(route.query.category.toString())
}

// Meta tags for SEO
useHead({
  title: 'FD Shop - Marketplace',
  meta: [
    {
      name: 'description',
      content: 'Découvrez notre sélection de produits de qualité. Navigation facile, recherche rapide et livraison gratuite disponible.'
    },
    {
      name: 'keywords',
      content: 'shopping, e-commerce, produits, achats en ligne, marketplace'
    },
    {
      property: 'og:title',
      content: 'FD Shop - Votre marketplace en ligne'
    },
    {
      property: 'og:description',
      content: 'Découvrez notre sélection de produits de qualité. Navigation facile, recherche rapide et livraison gratuite disponible.'
    },
    {
      name: 'robots',
      content: 'index, follow'
    }
  ]
})
</script>
