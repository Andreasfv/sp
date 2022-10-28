import { Prisma, Straffepils } from '@prisma/client'
import { Context } from '../../context'
import { createScopedPermission } from '../../core/authorization/core'
import { userHasAccess } from '../../core/authorization/util'
import { BllResult, ErrorType, Fail, Ok } from '../../core/types'
import {
  GetManyStraffepilsFilterSchema,
  UpdateStraffepilsSchema,
} from './types'

export async function getStraffepils(
  context: Context,
  id: number,
): Promise<BllResult<Straffepils>> {
  // if (
  //   !userHasAccess(
  //     context.user,
  //     [createScopedPermission('straffepils', id)],
  //     'read',
  //   )
  // ) {
  //   return Fail({
  //     type: ErrorType.Unauthorized,
  //   })
  // }

  const straffepils = await context.prisma.straffepils.findUnique({
    where: {
      id,
    },
  })

  if (!straffepils) {
    return Fail({
      type: ErrorType.NotFound,
    })
  }

  return Ok(straffepils)
}

export async function updateStraffepils(
  context: Context,
  id: number,
  data: UpdateStraffepilsSchema,
): Promise<BllResult<{ ok: boolean }>> {
  // if (
  //   !userHasAccess(
  //     context.user,
  //     [createScopedPermission('straffepils', id)],
  //     'update',
  //   )
  // ) {
  //   return Fail({
  //     type: ErrorType.Unauthorized,
  //   })
  // }

  const parseResult = UpdateStraffepilsSchema.safeParse(data)

  if (!parseResult.success) {
    return Fail({
      type: ErrorType.BadInput,
      description: parseResult.error.message,
    })
  }

  await context.prisma.straffepils.update({
    where: { id: id },
    data,
  })

  return Ok({ ok: true })
}

export async function getManyStraffepils(
  context: Context,
  filter: GetManyStraffepilsFilterSchema,
): Promise<BllResult<Straffepils[]>> {
  // if (
  //   !userHasAccess(
  //     context.user,
  //     [createScopedPermission('straffepils')],
  //     'read',
  //   )
  // ) {
  //   return Fail({
  //     type: ErrorType.Unauthorized,
  //   })
  // }

  const {
    filterString,
    byGiver,
    confirmed,
    byReceiver,
    organizationId,
    skip,
    take,
  } = filter
  var where = {
    where: {
      giverId: byGiver,
      receiverId: byReceiver,
      confirmed: confirmed,
      receiver: {
        organizationId: organizationId,
      },
    },
  }
  const straffepils = await context.prisma.straffepils.findMany({
    ...where,
    skip,
    take,
  })

  return Ok(straffepils)
}

export async function getUserReceivedStraffepils(
  context: Context,
  id: number,
): Promise<BllResult<Straffepils[]>> {
  // if (
  //   !userHasAccess(
  //     context.user,
  //     [createScopedPermission('straffepils')],
  //     'read',
  //   )
  // ) {
  //   return Fail({
  //     type: ErrorType.Unauthorized,
  //   })
  // }

  const straffepils = await context.prisma.straffepils.findMany({
    where: {
      receiverId: id,
    },
  })

  return Ok(straffepils)
}

export async function getUserGivenStraffepils(
  context: Context,
  filter: Omit<GetManyStraffepilsFilterSchema, 'filterString'>,
): Promise<BllResult<Straffepils[]>> {
  // if (
  //   !userHasAccess(
  //     context.user,
  //     [createScopedPermission('straffepils')],
  //     'read',
  //   )
  // ) {
  //   return Fail({
  //     type: ErrorType.Unauthorized,
  //   })
  // }

  const { byGiver, skip, take } = filter

  const straffepils = await context.prisma.straffepils.findMany({
    where: {
      giverId: byGiver,
    },
    skip,
    take,
  })

  return Ok(straffepils)
}

export async function createStraffepils(
  context: Context,
  data: Omit<Straffepils, 'id' | 'confirmed'>,
): Promise<BllResult<{ ok: boolean }>> {
  // if (
  //   !userHasAccess(
  //     context.user,
  //     [createScopedPermission('straffepils')],
  //     'create',
  //   )
  // ) {
  //   return Fail({
  //     type: ErrorType.Unauthorized,
  //   })
  // }
  const straffepils = await context.prisma.straffepils.create({
    data,
  })

  return Ok({ ok: true })
}
