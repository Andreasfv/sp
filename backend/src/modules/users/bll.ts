import { User } from '@prisma/client'
import { Context } from '../../context'
import { createScopedPermission } from '../../core/authorization/core'
import { userHasAccess } from '../../core/authorization/util'
import { BllResult, ErrorType, Fail, Ok } from '../../core/types'
import { GetManyUsersFilterSchema } from './types'

export async function getUser(
  context: Context,
  id: number,
): Promise<BllResult<User>> {
  // if (
  //   !userHasAccess(context.user, [createScopedPermission('users', id)], 'read')
  // ) {
  //   return Fail({
  //     type: ErrorType.Unauthorized,
  //   })
  // }

  const user = await context.prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) {
    return Fail({
      type: ErrorType.NotFound,
    })
  }

  return Ok(user)
}

export async function getManyUsers(
  context: Context,
  filter: GetManyUsersFilterSchema,
): Promise<BllResult<User[]>> {
  // if (!userHasAccess(context.user, ['users'], 'read')) {
  //   return Fail({
  //     type: ErrorType.Unauthorized,
  //   })
  // }

  const { filterString, skip, take, orderBy } = filter

  const where = filterString
    ? {
        OR: [
          { firstName: { contains: filterString } },
          { lastName: { contains: filterString } },
          { email: { contains: filterString } },
        ],
      }
    : {}

  const users = await context.prisma.user.findMany({
    where,
    skip,
    take,
    orderBy,
  })

  return Ok(users)
}

export async function getMe(context: Context): Promise<BllResult<User>> {
  const me = context.user
  const user = await context.prisma.user.findUnique({
    where: {
      id: me?.id,
    },
  })

  if (!me) {
    return Fail({
      type: ErrorType.NotFound,
      description: 'You are not logged in',
    })
  }

  return user ? Ok(user) : Fail({ type: ErrorType.NotFound })
}

export async function createUser(
  context: Context,
  user: User,
): Promise<BllResult<User>> {
  if (!userHasAccess(context.user, ['users'], 'create')) {
    return Fail({
      type: ErrorType.Unauthorized,
    })
  }

  const newUser = await context.prisma.user.create({ data: user })

  return Ok(newUser)
}
