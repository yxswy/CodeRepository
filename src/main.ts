import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { setupVite } from './ssr-vue/index'
import { join } from 'path'
import * as serveStatic from 'serve-static'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useStaticAssets(join(__dirname, '..', 'dist'),{
    prefix: '/dist/',
  })

  app.use(
    '/public',
    serveStatic(join(__dirname, '../public'), {
      maxAge: '1d',
      extensions: ['jpg', 'jpeg', 'png', 'gif'],
    }),
  )

  await setupVite()
  await app.listen(4000)
}
bootstrap()
