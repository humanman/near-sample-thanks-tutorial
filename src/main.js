// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/scss/globals.scss'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Vuex from 'vuex'

require('typeface-source-sans-pro')

config.autoAddCss = false;
library.add(faGithub, faTwitter)

export default function (Vue, { router, head, isClient, appOptions }) {
  Vue.use(Vuex)

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // Add iconography plugin
  Vue.component('font-awesome', FontAwesomeIcon)

  // Add attributes to HTML tag
  head.htmlAttrs = { lang: 'en' }

  head.link.push({
    rel: 'manifest',
    href: '/manifest.json'
  })

  head.meta.push({
    name: 'theme-color',
    content: '#10c186'
  })

  head.meta.push({
    name: 'google-site-verification',
    content: process.env.GSV_META
  })

  head.meta.push({
    name: 'apple-mobile-web-app-status-bar-style',
    content: 'default'
  })

  // State
  appOptions.store = new Vuex.Store({
    state: {
      sidebarOpen: false
    },
    mutations: {
      toggleSidebar(state) {
        state.sidebarOpen = !state.sidebarOpen
      },
      closeSidebar(state) {
        state.sidebarOpen = false
      },
      openSidebar(state) {
        state.sidebarOpen = true
      }
    }
  })
}
