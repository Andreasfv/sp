import { extendType, objectType } from 'nexus'

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.nonNull.string('token')
    t.nonNull.field('user', {
      type: 'User',
    })
  },
})

export const IsLoggedInQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.boolean('isLoggedIn', {
      resolve(_parent, _args, ctx) {
        return !!ctx.user
      },
    })
  },
})
