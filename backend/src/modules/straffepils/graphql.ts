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
} from 'nexus'
import { convertNullsToUndefined } from '../../utils/object'
import { createStraffepils, getManyStraffepils, getStraffepils } from './bll'
import { UserOrderByInput } from 'modules/users/graphql'
import { BllResult } from 'core/types'

export const Straffepils = objectType({
  name: 'Straffepils',
  definition(t) {
    t.nonNull.int('receiverId')
    t.nonNull.int('giverId')
    t.nonNull.string('reason')
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
        console.log('NANI')
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
        skip: intArg(),
        take: intArg(),
      },
      resolve: async (_parent, args, context) => {
        console.log('BRUH HVORFOR IKKE NÅ DA')
        const filter = convertNullsToUndefined({
          filterString: args.filterString ?? '',
          byGiver: args.byGiver ?? null,
          byReceiver: args.byReceiver ?? null,
          skip: args.skip ?? null,
          take: args.take ?? null,
        })
        console.log('CMON BRUH', filter)
        const result = await getManyStraffepils(context, filter)
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
        console.log('HALLLLLOOO')
        const result = await createStraffepils(context, args.data)
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
