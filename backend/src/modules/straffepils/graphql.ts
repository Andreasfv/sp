import { Prisma, User } from '@prisma/client'
import { getUser } from '../users/bll'
import {
  nonNull,
  objectType,
  inputObjectType,
  arg,
  extendType,
  stringArg,
  intArg,
  list,
  booleanArg,
} from 'nexus'
import { convertNullsToUndefined } from '../../utils/object'
import {
  createStraffepils,
  getManyStraffepils,
  getStraffepils,
  updateStraffepils,
} from './bll'

export const Straffepils = objectType({
  name: 'Straffepils',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.int('receiverId')
    t.nonNull.int('giverId')
    t.nonNull.string('reason')
    t.nonNull.int('amount')
    t.string('reason')
    t.nullable.boolean('confirmed')
    t.nonNull.field('giver', {
      type: 'User',
      resolve: async (parent, _args, context) => {
        const result = await getUser(context, parent.giverId)
        return result.getOrThrow()
      },
    })
    t.nonNull.field('receiver', {
      type: 'User',
      resolve: async (parent, _args, context) => {
        const result = await getUser(context, parent.receiverId)
        return result.getOrThrow()
      },
    })
  },
})

export const UserStraffepils = objectType({
  name: 'UserStraffepils',
  definition(t) {
    t.nonNull.field('straffepilsAmount', {
      type: 'Int',
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_parent, args, context) => {
        const sp = await getManyStraffepils(context, {
          byReceiver: args.id!,
          confirmed: true,
        })
        const amount = sp.getOrThrow().reduce((a, sp) => a + sp.amount, 0)
        return amount
      },
    })
    t.nonNull.list.field('straffepils', {
      type: Straffepils,
      args: { id: nonNull(intArg()) },
      resolve: async (_parent, args, context) => {
        const result = await getManyStraffepils(context, {
          byReceiver: args.id,
          confirmed: true,
        })
        return result.getOrThrow()
      },
    })
  },
})

export const StraffepilsOrderByInput = inputObjectType({
  name: 'StraffepilsOrderByInput',
  definition(t) {
    t.field('amount', { type: 'Sort' })
    t.field('reason', { type: 'Sort' })
    t.field('receiverId', { type: 'Sort' })
    t.field('giverId', { type: 'Sort' })
  },
})

export const StraffepilsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('straffepils', {
      type: Straffepils,
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_parent, args, context) => {
        const result = await getStraffepils(context, args.id)
        return result.getOrThrow()
      },
    })
    t.list.field('allStraffepils', {
      type: Straffepils,
      args: {
        filterString: stringArg(),
        byGiver: intArg(),
        byReceiver: intArg(),
        organizationId: intArg(),
        confirmed: booleanArg(),
        skip: intArg(),
        take: intArg(),
      },
      resolve: async (_parent, args, context) => {
        const filter = convertNullsToUndefined({
          filterString: args.filterString ?? '',
          byGiver: args.byGiver ?? null,
          byReceiver: args.byReceiver ?? null,
          organizationId: args.organizationId ?? null,
          confirmed: args.confirmed ?? null,
          skip: args.skip ?? null,
          take: args.take ?? null,
        })
        const result = await getManyStraffepils(context, filter)
        return result.getOrThrow()
      },
    })
    t.field('userStraffepils', {
      type: UserStraffepils,
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_parent, args, context) => {
        const result = await getUser(context, args.id)
        return result.getOrThrow()
      },
    })
  },
})

export const StraffepilsMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createStraffepils', {
      type: CreateStraffepilsReturn,
      args: {
        data: nonNull(
          arg({
            type: 'StraffepilsCreateInput',
          }),
        ),
      },
      resolve: async (_parent, args, context) => {
        const result = await createStraffepils(context, args.data)
        return result.getOrThrow()
      },
    })
    t.nonNull.field('updateStraffepils', {
      type: UpdateStraffepilsReturn,
      args: {
        id: nonNull(intArg()),
        data: nonNull(
          arg({
            type: 'StraffepilsUpdateInput',
          }),
        ),
      },
      resolve: async (_parent, args, context) => {
        const result = await updateStraffepils(context, args.id, args.data)
        return result.getOrThrow()
      },
    })
  },
})

export const StraffepilsCreateInput = inputObjectType({
  name: 'StraffepilsCreateInput',
  definition(t) {
    t.nonNull.int('giverId')
    t.nonNull.int('receiverId')
    t.nonNull.string('reason')
    t.nonNull.int('amount')
  },
})

export const StraffepilsUpdateInput = inputObjectType({
  name: 'StraffepilsUpdateInput',
  definition(t) {
    t.field('giverId', { type: 'Int' })
    t.field('receiverId', { type: 'Int' })
    t.field('reason', { type: 'String' })
    t.field('amount', { type: 'Int' })
    t.field('confirmed', { type: 'Boolean' })
  },
})

export const CreateStraffepilsReturn = objectType({
  name: 'CreateStraffepilsReturn',
  definition(t) {
    t.boolean('ok')
  },
})

export const UpdateStraffepilsReturn = objectType({
  name: 'UpdateStraffepilsReturn',
  definition(t) {
    t.boolean('ok')
  },
})
