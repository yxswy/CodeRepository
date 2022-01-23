import { Injectable } from '@nestjs/common'
// import { parse, compileTemplate, compileScript } from 'vue/compiler-sfc'
// import { renderToString } from '@vue/server-renderer'
import { createSSRApp } from 'vue'
import type { App } from 'vue'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { vite, manifest } from './ssr-vue/index'

@Injectable()
export class AppService {
  async getHello(): Promise<string> {

    const url = 'http://localhost:4000'
    let template = readFileSync(resolve('./src/ssr-vue/index.html'), 'utf-8')

    template = await vite.transformIndexHtml(url, template)
    console.log(template)
    let render = (await vite.ssrLoadModule('./src/ssr-vue/src/entry-server.ts')).render

    const [appHtml, preloadLinks] = await render(url, manifest)

    const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml)

    return html
  }

  createApp(): App {
    return createSSRApp({
      data() {
        return {
          user: 'John Doe',
        }
      },
      template: `<div>Current user is: {{ user }}</div>`,
    })
  }
}
