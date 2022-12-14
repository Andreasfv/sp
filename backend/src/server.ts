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

app.use('/graphql', server)
app.use('/', () => 'moren din')
app.listen(urConfig.backend.port, () => {
  console.log(server.getAddressInfo())
  console.log(`Server is running on http://localhost:${urConfig.backend.port}`)
})
