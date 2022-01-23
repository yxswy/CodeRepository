import App from './app.vue'
import { createSSRApp } from 'vue'

function createApp() {
  const app = createSSRApp(App)

  return { app }
}

const { app } = createApp()

app.mount('#app')
