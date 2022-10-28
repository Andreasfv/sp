import { authExchange } from '@urql/exchange-auth'
import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  makeOperation,
} from 'urql'
import { getAuthToken } from 'modules/auth'
import { devtoolsExchange } from '@urql/devtools'
import urConfig from '../../ur.json'

interface AuthState {
  token: string
}

const url = `http://localhost:2337/graphql`

export const client = createClient({
  url,
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    authExchange<AuthState>({
      async getAuth({ authState }) {
        if (!authState) {
          const token = getAuthToken()
          return !!token ? { token } : null
        }
        return null
      },
      addAuthToOperation({ authState, operation }) {
        const auth: Partial<AuthState> = { ...authState }
        if (!auth.token) {
          const token = getAuthToken()
          if (!token) return operation

          auth.token = token
        }

        const fetchOptions =
          typeof operation.context.fetchOptions === 'function'
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {}

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Bearer ${auth.token ?? ''}`,
            },
          },
        })
      },
    }),
    fetchExchange,
  ],
})
