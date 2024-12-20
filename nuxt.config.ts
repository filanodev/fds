// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/info',
        '/cart',
        '/categories',
        '/contact',
        '/privacy',
        '/terms'
      ]
    },
    minify: true,
    compressPublicAssets: true
  },

  app: {
    head: {
      title: 'Piketplace - Modern Shopping Experience',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Discover and shop unique products on Piketplace - Your modern Pi Network marketplace' }
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
      version: process.env.NUXT_PUBLIC_VERSION || '1.0.0',
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

  experimental: {
    payloadExtraction: true,
    inlineSSRStyles: true,
    renderJsonPayloads: true,
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
