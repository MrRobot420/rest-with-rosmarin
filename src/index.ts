import 'reflect-metadata'
import { RestApplication } from 'rosmarin.ts'

async function main(): Promise<void> {
  const app = new RestApplication({
    prefix: '/api',
  })

  await app.start()
}

main()
