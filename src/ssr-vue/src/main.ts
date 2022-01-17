import App from './app.vue'
import { createSSRApp } from 'vue'

console.log(999999)
export function createApp() {
  const app = createSSRApp(App)

  return { app }
}
