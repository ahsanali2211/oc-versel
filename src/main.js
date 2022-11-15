import { createApp } from 'vue'
import { Quasar, Notify,Loading,Meta } from 'quasar'
import { createPinia, PiniaVuePlugin } from 'pinia'
import Pusher from 'pusher-js'
 const pinia = createPinia()

// Import icon libraries
// import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
 import 'quasar/src/css/index.sass'
import './assets/css/style.css' 

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'
  
const apiKey = import.meta.env.VITE_PUSHER_APP_KEY
const cluster =import.meta.env.VITE_PUSHER_APP_CLUSTER
const PusherPlugin =  (app, { apiKey, ...options }) => {
  app.config.globalProperties.$pusher = new Pusher(apiKey, options)
}
const myApp = createApp(App)
 
myApp.use(pinia)
myApp.use(PusherPlugin, { apiKey, cluster })
myApp.use(Quasar, {
  plugins: {
    Notify,
    Loading,
    Meta
  }, // import Quasar plugins and add here
})
// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')
