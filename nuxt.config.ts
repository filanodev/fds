// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  
  app: {
    head: {
      title: 'Piketplace - Modern Shopping Experience',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Shop the latest products with our modern e-commerce platform' }
      ],
      script: [
        {
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3962442438023665',
          async: true,
          crossorigin: 'anonymous'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        }
      ]
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],

  css: [
    '~/assets/css/main.css',
  ],

  runtimeConfig: {
    public: {
      apiBase: 'https://mainnet-backend.piketplace.com/api/v1',
      defaultParams: {
        locale: 'en',
        connected_user_id: 0,
        status: 'validated',
        verified_shops: 1,
        filter: {
          iso2: 'all',
          iso3: 'all',
          search: '',
          sort_by: 'newest',
          show_products_type: 'all',
          is_updated: false
        }
      }
    }
  },

  nitro: {
    compressPublicAssets: true
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }
  },

  experimental: {
    payloadExtraction: true,
    inlineSSRStyles: false,
    viewTransition: true
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  routeRules: {
    '/': { prerender: true },
    '/product/**': { swr: 3600 },
    '/categories': { prerender: true },
    '/search': { ssr: true }
  },

  devtools: { enabled: true }
})
