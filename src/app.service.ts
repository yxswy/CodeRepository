import { Injectable } from '@nestjs/common'
import { parse, compileTemplate, compileScript } from 'vue/compiler-sfc'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp } from 'vue'
import type { App } from 'vue'
import { readFileSync } from 'fs'
import { resolve } from 'path/posix'

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    console.log(resolve('./src/views/app.vue'))
    const fileContent = await readFileSync(
      resolve('./src/views/app.vue'),
      'utf-8',
    )

    const parseContent = parse(fileContent)
    const templatContent = compileTemplate({
      source: parseContent.descriptor.template.content,
      filename: 'App.vue',
      id: 'App.vue',
    })
    console.log(templatContent.code)
    const scriptContent = compileScript(parseContent.descriptor, {
      id: 'App.vue',
    })
    console.log(scriptContent.content)

    // const { render } = eval(templatContent.code)
    // console.log(render)

    const app = createSSRApp({
      
    })
    // const app = this.createApp()
    const appContent = await renderToString(app)

    const html = `
      <html>
        <body>
          <h1>My First Heading</h1>
          <div id="app">${appContent}</div>
        </body>
      </html>
    `

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
