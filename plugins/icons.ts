import { defineNuxtPlugin } from '#app'
import * as icons from '~/components/icons'

export default defineNuxtPlugin((nuxtApp) => {
  Object.entries(icons).forEach(([name, component]) => {
    nuxtApp.vueApp.component(name, component)
  })
})
