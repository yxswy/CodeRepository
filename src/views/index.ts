import { createApp } from 'vue'
import App from './app.vue'

export function mainApp() {
    const app = createApp(App)
    return app
}