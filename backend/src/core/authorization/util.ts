import { User } from '@prisma/client'
import { createScopedPermission, permissionsGrantsAccess } from './core'

export function userHasAccess(
  user: User | null,
  requiredPermissions: string[],
  verb?: string,
) {
  if (!user) {
    return false
  }

  const userPermissions = getUserPermissions(user)

  return permissionsGrantsAccess(requiredPermissions, userPermissions, verb)
}

export function getUserPermissions(user: User) {
  const isAdmin = user.role === 'ADMIN'

  if (isAdmin) {
    return ['*']
  }

  return [
    createScopedPermission('users', user.id),
    createScopedPermission(
      'organizations',
      user.organizationId,
      'users',
      user.id,
    ),
    createScopedPermission('organizations', user.organizationId, 'read'),
  ]
}

export async function IsAdmin(user: User | null) {
  if (!user) {
    throw new Error('Invalid login credentials')
  }

  if (user.role !== 'ADMIN') {
    throw new Error('You are not an admin')
  }
}

export function IsAuthenticated(user: User | null) {
  return user !== null
}
