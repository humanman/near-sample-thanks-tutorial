// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/scss/globals.scss'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faLightbulb, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css"
import Vuex from 'vuex'
import ContractForm from '~/components/contract-ui/ContractForm.vue'
import Highlightable from '~/components/Highlightable.vue'
import Vssue from 'vssue'
import GithubV3 from '@vssue/api-github-v3'
import 'vssue/dist/vssue.css'

require('typeface-source-sans-pro')

config.autoAddCss = false;
library.add(faGithub, faTwitter)

export default function (Vue, { router, head, isClient, appOptions }) {

  // Add iconography plugin
  library.add(faLightbulb, faQuoteLeft, faQuoteRight)
  Vue.component('fa-icon', FontAwesomeIcon)
  
  // out-of-the-box slick layouts plus material design classes
  Vue.use(Vuetify);

  // not actually sure if needed
  Vue.use(Vuex)

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)


  // Add contract demo
  Vue.component('contract-form', ContractForm)
  
  // Add Medium Style Select Text to Comment Functionality
  Vue.component('highlightable', Highlightable)

  // allows users to comment via GH issues on any text they select
  Vue.use(Vssue, {
    api: GithubV3,
    owner: process.env.GRIDSOME_REPO_OWNER,
    repo: process.env.GRIDSOME_REPO_NAME,
    clientId: process.env.GRIDSOME_VSSUE_CLIENT_ID,
    clientSecret: process.env.GRIDSOME_VSSUE_CLIENT_SECRET
  })

  // // allows users to comment via GH issues on any text they select
  // Vue.use(VueNear, {
  //   // Needs the environment for the correct RPC to use
  //   env: 'development',
  //   config: {
  //     appTitle: 'Thanks',
  //     contractName: 'thanks.humanman.testnet',
  //   },
  // })


  // Add attributes to HTML tag
  head.htmlAttrs = { lang: 'en' }

  head.link.push({
    rel: 'manifest',
    href: '/manifest.json'
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
  });

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

  // NEAR API 
  head.script.push({
    src: "https://cdn.jsdelivr.net/gh/nearprotocol/near-api-js/dist/near-api-js.js"
  })
  
  //UI
  appOptions.vuetify = new Vuetify({});
  
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
