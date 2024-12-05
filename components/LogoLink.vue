<template>
  <NuxtLink to="/" class="flex items-center" @click="handleClick">
    <div class="relative w-12 h-12">
      <!-- Cart Icon -->
      <svg class="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Shopping Cart -->
        <path class="text-blue-600" fill="currentColor" d="M30 60 L70 60 L80 30 L20 30 Z" />
        <path class="text-blue-600" fill="currentColor" d="M35 70 A5 5 0 1 0 35 80 A5 5 0 1 0 35 70" />
        <path class="text-blue-600" fill="currentColor" d="M65 70 A5 5 0 1 0 65 80 A5 5 0 1 0 65 70" />
        
        <!-- Pixels Animation -->
        <g class="pixels">
          <rect class="pixel" x="10" y="20" width="4" height="4" fill="#38BDF8">
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0s" />
          </rect>
          <rect class="pixel" x="16" y="24" width="4" height="4" fill="#FB923C">
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.2s" />
          </rect>
          <rect class="pixel" x="22" y="28" width="4" height="4" fill="#38BDF8">
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.4s" />
          </rect>
        </g>

        <!-- WiFi Signals -->
        <g class="wifi-signals" transform="translate(70, 15) scale(0.5)">
          <path class="signal" fill="#FB923C" d="M0 24 A24 24 0 0 1 48 24">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
          </path>
          <path class="signal" fill="#FB923C" d="M8 24 A16 16 0 0 1 40 24">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" begin="0.2s" />
          </path>
          <path class="signal" fill="#FB923C" d="M16 24 A8 8 0 0 1 32 24">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" begin="0.4s" />
          </path>
        </g>
      </svg>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useFiltersStore } from '~/stores/filters'
import { useProductStore } from '~/stores/product'

const filtersStore = useFiltersStore()
const productStore = useProductStore()

const handleClick = () => {
  // Réinitialiser les filtres et le store des produits
  filtersStore.resetFilters()
  productStore.resetStore()
}
</script>
