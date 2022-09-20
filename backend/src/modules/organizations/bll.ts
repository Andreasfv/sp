import { Organization, User } from '@prisma/client'
import { Context } from '../../context'
import { createScopedPermission } from '../../core/authorization/core'
import { userHasAccess } from '../../core/authorization/util'
import { BllResult, ErrorType, Fail, Ok } from '../../core/types'
import {
  CreateOrganizationSchema,
  GetManyOrganizationsFilterSchema,
  UpdateOrganizationSchema,
} from './types'

export async function getOrganization(
  context: Context,
  id: number,
): Promise<BllResult<Organization>> {
  if (
    !userHasAccess(
      context.user,
      [createScopedPermission('organizations', id)],
      'read',
    )
  ) {
    return Fail({
      type: ErrorType.Unauthorized,
    })
  }

  const organization = await context.prisma.organization.findUnique({
    where: {
      id,
    },
  })

  if (!organization) {
    return Fail({
      type: ErrorType.NotFound,
    })
  }

  return Ok(organization)
}

export async function getManyOrganizations(
  context: Context,
  filter: GetManyOrganizationsFilterSchema,
): Promise<BllResult<Organization[]>> {
  if (!userHasAccess(context.user, ['organizations'], 'read')) {
    return Fail({
      type: ErrorType.Unauthorized,
    })
  }

  const { filterString, skip, take, orderBy } = filter

  const where = filterString
    ? {
        OR: [
          { name: { contains: filterString } },
          { description: { contains: filterString } },
        ],
      }
    : {}

  const organizations = await context.prisma.organization.findMany({
    where,
    skip,
    take,
    orderBy,
  })

  return Ok(organizations)
}

export async function getOrganizationUsers(
  context: Context,
  organizationId: number,
): Promise<BllResult<User[]>> {
  if (
    !userHasAccess(
      context.user,
      [createScopedPermission('organizations', organizationId, 'users')],
      'read',
    )
  ) {
    return Fail({
      type: ErrorType.Unauthorized,
    })
  }

  const users = await context.prisma.user.findMany({
    where: {
      Organization: {
        id: organizationId,
      },
    },
  })

  if (!users) {
    return Fail({
      type: ErrorType.NotFound,
    })
  }

  return Ok(users)
}

export async function createOrganization(
  context: Context,
  data: CreateOrganizationSchema,
): Promise<BllResult<Organization>> {
  if (!userHasAccess(context.user, ['organizations'], 'create')) {
    return Fail({
      type: ErrorType.Unauthorized,
    })
  }

  const parseResult = CreateOrganizationSchema.safeParse(data)

  if (!parseResult.success) {
    return Fail({
      type: ErrorType.BadInput,
      description: parseResult.error.message,
    })
  }

  const organization = await context.prisma.organization.create({
    data,
  })

  return Ok(organization)
}

export async function updateOrganization(
  context: Context,
  id: number,
  data: UpdateOrganizationSchema,
): Promise<BllResult<Organization>> {
  if (!userHasAccess(context.user, ['organizations'], 'update')) {
    return Fail({
      type: ErrorType.Unauthorized,
    })
  }

  const parseResult = UpdateOrganizationSchema.safeParse(data)

  if (!parseResult.success) {
    return Fail({
      type: ErrorType.BadInput,
      description: parseResult.error.message,
    })
  }

  const organization = await context.prisma.organization.update({
    where: {
      id: id,
    },
    data,
  })

  return Ok(organization)
}

export async function deleteOrganization(
  context: Context,
  id: number,
): Promise<BllResult<Organization>> {
  if (!userHasAccess(context.user, ['organizations'], 'delete')) {
    return Fail({
      type: ErrorType.Unauthorized,
    })
  }

  const organization = await context.prisma.organization.delete({
    where: {
      id: id,
    },
  })

  return Ok(organization)
}
