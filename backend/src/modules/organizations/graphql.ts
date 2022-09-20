import { Prisma } from '@prisma/client'
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
import {
  createOrganization,
  deleteOrganization,
  getManyOrganizations,
  getOrganization,
  getOrganizationUsers,
  updateOrganization,
} from './bll'

export const Organization = objectType({
  name: 'Organization',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.string('description')
    t.nonNull.list.nonNull.field('users', {
      type: 'User',
      resolve: async (parent, _, context) => {
        const users = await getOrganizationUsers(context, parent.id)
        return users.getOrElse([])
      },
    })
  },
})

export const OrganizationOrderByInput = inputObjectType({
  name: 'OrganizationOrderByInput',
  definition(t) {
    t.field('name', { type: 'Sort' })
    t.field('description', { type: 'Sort' })
  },
})

export const OrganizationQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('organization', {
      type: Organization,
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_parent, args, context) => {
        const result = await getOrganization(context, args.id)
        return result.getOrThrow()
      },
    })
    t.list.field('allOrganizations', {
      type: Organization,
      args: {
        filterString: stringArg(),
        skip: intArg(),
        take: intArg(),
        orderBy: arg({ type: list(nonNull(OrganizationOrderByInput)) }),
      },
      resolve: async (parent, args, context) => {
        const filter = convertNullsToUndefined({
          filterString: args.filterString,
          skip: args.skip,
          take: args.take,
          orderBy: args.orderBy,
        })

        const result = await getManyOrganizations(context, filter)
        return result.getOrThrow()
      },
    })
  },
})

export const UpdateOrganizationInput = inputObjectType({
  name: 'UpdateOrganizationInput',
  definition(t) {
    t.field('name', { type: 'String' })
    t.field('description', { type: 'String' })
  },
})

export const OrganizationMutation = extendType({
  type: 'Mutation',
  // Create organizaion
  definition(t) {
    t.nonNull.field('createOrganization', {
      type: Organization,
      args: {
        data: nonNull(
          arg({
            type: 'CreateOrganizationInput',
          }),
        ),
      },
      resolve: async (_, args, context) => {
        const organization = await createOrganization(context, args.data)
        return organization.getOrThrow()
      },
    })
    // Update organization
    t.nonNull.field('updateOrganization', {
      type: Organization,
      args: {
        id: nonNull(intArg()),
        data: nonNull(UpdateOrganizationInput),
      },
      resolve: async (_, args, context) => {
        const result = await updateOrganization(
          context,
          args.id,
          convertNullsToUndefined(args.data),
        )
        return result.getOrThrow()
      },
    })
    // Delete organization
    t.nonNull.field('deleteOrganization', {
      type: Organization,
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_, args, context) => {
        const result = await deleteOrganization(context, args.id)
        return result.getOrThrow()
      },
    })
  },
})

export const CreateOrganizationInput = inputObjectType({
  name: 'CreateOrganizationInput',
  definition(t) {
    t.nonNull.string('name')
    t.string('description')
  },
})
