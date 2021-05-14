import 'reflect-metadata'
import { RestApplication } from 'rosmarin.ts'
import { MyApiKeyInfoProvider, MyAuthenticationInfoProvider } from './api-provider'
import { BookController } from './book/book.controller'

async function main(): Promise<void> {
  const app = new RestApplication({
    prefix: '/api',
  })

  app.registerController(BookController)

  app.registerAuthenticationInfoProvider(MyAuthenticationInfoProvider)
  app.registerApiKeyInfoProvider(MyApiKeyInfoProvider)

  await app.start(5000)
}

main()
