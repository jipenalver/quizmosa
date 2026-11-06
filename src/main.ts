import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createRulesPlugin, createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Custom Vuetify Theme
import { createFont } from './utils/interface/font.ts'
import { customDefaults, customTheme } from './utils/interface/vuetify.ts'

createFont()

const app = createApp(App)

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: customTheme,
  },
  defaults: customDefaults,
  components,
  directives,
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(createRulesPlugin({}, vuetify.locale))

app.mount('#app')
