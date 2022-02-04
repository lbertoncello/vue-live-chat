import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { projectAuth } from './firebase/config'

import './assets/main.css'

let app

/*
 * This guarantees that the app will be loaded only when the connection
 * with Firebase is done.
 */
projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .mount('#app')
  }
})