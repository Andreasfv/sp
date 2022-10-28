import {
  nonNull,
  objectType,
  inputObjectType,
  arg,
  enumType,
  extendType,
  intArg,
  stringArg,
  list,
} from 'nexus'
import { Prisma, Role } from '@prisma/client'
import { getManyUsers, getMe, getUser } from './bll'
import { getOrganization } from '../organizations/bll'
import { loginUser, signupUser } from '../authentication/bll'
import { convertNullsToUndefined } from '../../utils/object'
import { getManyStraffepils } from '../straffepils/bll'

export const UserOrderByInput = inputObjectType({
  name: 'UserOrderByInput',
  definition(t) {
    t.field('firstName', { type: 'Sort' })
    t.field('lastName', { type: 'Sort' })
    t.field('email', { type: 'Sort' })
    t.field('role', { type: 'Sort' })
    t.field('organization', { type: 'Sort' })
  },
})

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('allUsers', {
      type: User,
      args: {
        filterString: stringArg(),
        skip: intArg(),
        take: intArg(),
        orderBy: arg({ type: list(nonNull(UserOrderByInput)) }),
      },
      resolve: async (_parent, args, context) => {
        const filter = convertNullsToUndefined({
          filterString: args.filterString ?? undefined,
          skip: args.skip ?? undefined,
          take: args.take ?? undefined,
          orderBy: args.orderBy ?? undefined,
        })
        const result = await getManyUsers(context, filter)
        return result.getOrThrow()
      },
    })

    t.field('user', {
      type: User,
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_parent, args, context) => {
        const result = await getUser(context, args.id)
        return result.getOrThrow()
      },
    })

    t.field('me', {
      type: User,
      resolve: async (_parent, _args, context) => {
        const result = await getMe(context)

        return result.getOrThrow()
      },
    })
  },
})

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // Signup user mutation
    t.nonNull.field('signupUser', {
      type: AutheticateUserReturn,
      args: {
        data: nonNull(
          arg({
            type: 'UserCreateInput',
          }),
        ),
      },
      resolve: async (_, args, context) => {
        const result = await signupUser(context, args.data)
        return result.getOrThrow()
      },
    })
    // Login user mutation
    t.nonNull.field('loginUser', {
      type: AutheticateUserReturn,
      args: {
        data: nonNull(
          arg({
            type: 'UserLoginInput',
          }),
        ),
      },
      resolve: async (_, args, context) => {
        const result = await loginUser(
          context,
          args.data.email,
          args.data.password,
        )
        return result.getOrThrow()
      },
    })
  },
})

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('firstName')
    t.nonNull.string('lastName')
    t.nonNull.string('email')
    t.nonNull.field('role', { type: RoleTypes })
    t.nonNull.int('organizationId')
    t.field('organization', {
      type: 'Organization',
      resolve: async (parent, _args, context) => {
        // TODO: Is parent.id correct here?
        const result = await getOrganization(context, parent.id)

        return result.getOrThrow()
      },
    })
    t.list.field('straffepils', {
      type: 'Straffepils',
      resolve: async (parent, _args, context) => {
        const result = await getManyStraffepils(context, {
          byReceiver: parent.id,
        })
        return result.getOrThrow()
      },
    })
  },
})

export const UserLoginInput = inputObjectType({
  name: 'UserLoginInput',
  definition(t) {
    t.nonNull.string('email')
    t.nonNull.string('password')
  },
})

export const AutheticateUserReturn = objectType({
  name: 'SignupUserReturn',
  definition(t) {
    t.string('token')
    t.field('user', { type: User })
  },
})

export const RoleTypes = enumType({
  name: 'Role',
  members: Role,
})

export const UserUniqueInput = inputObjectType({
  name: 'UserUniqueInput',
  definition(t) {
    t.int('id')
    t.string('email')
  },
})

export const UserCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('email')
    t.nonNull.string('firstName')
    t.nonNull.string('lastName')
    t.nonNull.string('password')
    t.nonNull.field('role', { type: RoleTypes })
    t.nonNull.int('organizationId')
  },
})
