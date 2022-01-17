import { createServer } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'

export let vite: any
export const manifest: Record<string, any> = {}

export async function setupVite() {
  vite = await createServer({
    plugins: [vuePlugin()],
    root: process.cwd(),
    logLevel: 'info',
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  })
}
