import { schema } from './schema'
import { createContext, defaultContext } from './context'
import { createServer, YogaInitialContext } from '@graphql-yoga/node'
import express from 'express'
import { IncomingMessage, ServerResponse } from 'http'
import urConfig from '../../ur.json'

const server = createServer({
  schema,
  context(
    context: YogaInitialContext & { req: IncomingMessage; res: ServerResponse },
  ) {
    return createContext(context)
  },
})

const app = express()

function json(url: string) {
  return fetch(url).then((res) => res.json())
}

let apiKey = '6fc7fe047ceb752c93c226b7ffa0b24230381e9776517dc898cb6154'
json(`https://api.ipdata.co?api-key=${apiKey}`).then((data) => {
  console.log(data.ip)
  console.log(data.city)
  console.log(data.country_code)
  // so many more properties
})

app.use('/graphql', server)
app.listen(urConfig.backend.port, () => {
  console.log(server)
  console.log(`Server is running on http://localhost:${urConfig.backend.port}`)
})
