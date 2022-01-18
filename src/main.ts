import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NotFoundFilter } from './not-found.filter'
import { logger } from './middleware/logger.middleware'
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.enableCors()
  app.useGlobalFilters(new NotFoundFilter())
  app.use(logger)

  await app.listen(3000)
}

bootstrap()
