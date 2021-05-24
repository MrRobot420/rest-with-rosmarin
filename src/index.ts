import 'reflect-metadata'
import { RestApplication } from 'rosmarin.ts'
import { MyApiKeyInfoProvider } from './api-provider'
import { BookController } from './book/book.controller'

async function main(): Promise<void> {
  const app = new RestApplication({
    prefix: '/api',
  })

  app.registerController(BookController)

  app.registerApiKeyInfoProvider(MyApiKeyInfoProvider)

  await app.start(5000)
}

main()
