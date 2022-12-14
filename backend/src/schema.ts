import * as UserSchema from './modules/users/graphql'
import * as OrganizationSchema from './modules/organizations/graphql'
import * as Types from './types/index'
import * as StraffepilsSchema from './modules/straffepils/graphql'

import { makeSchema } from 'nexus'

export const schema = makeSchema({
  types: {
    ...UserSchema,
    ...OrganizationSchema,
    ...Types,
    ...StraffepilsSchema,
  },
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
