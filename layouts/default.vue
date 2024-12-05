<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Fixed Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <!-- Top Navigation -->
      <nav class="border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex items-center justify-between h-16">
            <!-- Logo -->
            <LogoLink />
            <!-- Search Bar (Desktop) -->
            <div class="hidden md:flex-1 md:flex md:items-center md:justify-center md:px-8">
              <div class="w-full max-w-2xl">
                <SearchBar />
              </div>
            </div>

            <!-- Navigation Links -->
            <div class="hidden md:flex md:items-center md:space-x-6">
              <NuxtLink 
                v-for="item in menuItems" 
                :key="item.path"
                :to="item.path"
                class="flex items-center text-gray-600 hover:text-gray-900"
              >
                <component :is="item.icon" class="h-5 w-5" />
              </NuxtLink>
            </div>

            <!-- Mobile Menu Button -->
            <div class="md:hidden">
              <button 
                @click="toggleMenu"
                class="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <svg 
                  class="h-6 w-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    v-if="!isMenuOpen" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path 
                    v-else 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Search Bar (Mobile) -->
      <div class="md:hidden p-4 border-b border-gray-100">
        <SearchBar />
      </div>
    </header>

    <!-- Mobile Menu -->
    <div 
      v-if="isMenuOpen"
      class="fixed inset-0 z-40 md:hidden"
      @click="closeMenu"
    >
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>

      <!-- Menu panel -->
      <nav 
        class="fixed bottom-0 left-0 right-0 top-auto bg-white border-t border-gray-100 p-4"
        @click.stop
      >
        <div class="grid grid-cols-5 gap-4">
          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.path"
            :to="item.path"
            class="flex flex-col items-center text-gray-600 hover:text-gray-900"
            @click="closeMenu"
          >
            <component :is="item.icon" class="h-6 w-6" />
          </NuxtLink>
        </div>
      </nav>
    </div>

    <!-- Main Content -->
    <main class="pt-32 pb-8">
      <slot />
    </main>

    <!-- Bottom Navigation -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3">
      <div class="max-w-screen-xl mx-auto px-4 flex justify-around">
        <NuxtLink to="/" class="flex flex-col items-center text-gray-600 hover:text-gray-900">
          <i class="fas fa-home text-xl mb-1"></i>
          <span class="text-xs">Home</span>
        </NuxtLink>
        <NuxtLink to="/categories" class="flex flex-col items-center text-gray-600 hover:text-gray-900">
          <i class="fas fa-th-large text-xl mb-1"></i>
          <span class="text-xs">Categories</span>
        </NuxtLink>
        <NuxtLink to="/shipping" class="flex flex-col items-center text-gray-600 hover:text-gray-900">
          <i class="fas fa-truck text-xl mb-1"></i>
          <span class="text-xs">Shipping</span>
        </NuxtLink>
        <NuxtLink to="/info" class="flex flex-col items-center text-gray-600 hover:text-gray-900">
          <i class="fas fa-info-circle text-xl mb-1"></i>
          <span class="text-xs">Info</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { IconHome, IconCategory, IconShield, IconMail, IconDocument } from '~/components/icons'
import LogoLink from '~/components/LogoLink.vue'

const route = useRoute()
const isMenuOpen = ref(false)
const cartItemCount = ref(0)

const menuItems = [
  { name: 'Home', path: '/', icon: IconHome },
  { name: 'Categories', path: '/categories', icon: IconCategory },
  { name: 'Privacy', path: '/privacy', icon: IconShield },
  { name: 'Contact', path: '/contact', icon: IconMail },
  { name: 'Terms', path: '/terms', icon: IconDocument }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>
