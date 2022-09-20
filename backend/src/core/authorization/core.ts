/**
 *  This is slightly simpler than the method scopes_grant_permission below, and follows the following rules:
 *
 *    1. If the granting_scope has an exclusion rule (starts with "-"), we always return false.
 *    2. If the scopes are equal, we always returns true.
 *    3. If the granting_scope is an exact rule (starts with "="), we expand the required scope non-recursively with the verb, and then check for equality.
 *    4. Expand the required scope recursively with the verb and check if the scopes match.
 *
 * @param requiredPermission Required permission for access
 * @param grantingPermission Supplied permission for access
 * @param verb The verb to check against
 */
export function singlePermissionGrantsAccess(
  requiredPermission: string,
  grantingPermission: string,
  verb?: string,
) {
  if (grantingPermission.startsWith('-')) {
    return false
  }

  if (requiredPermission === grantingPermission) {
    return true
  }

  const expandedPermissions = grantingPermission.startsWith('=')
    ? expandPermissionsWithVerb([grantingPermission], verb)
    : expandPermissionsWithVerbRecursively([grantingPermission], verb)

  return anyPermissionMatches(expandedPermissions, [grantingPermission])
}

export function permissionsGrantsAccess(
  requiredPermissions: string[],
  grantingPermissions: string[],
  verb?: string,
) {
  if (requiredPermissions.length === 0) {
    return true
  }

  const {
    excludeExactPermissions,
    includeExactPermissions,
    excludePermissions,
    includePermissions,
  } = partitionPermissions(grantingPermissions)

  const expandedBaseRequiredPermissions = expandPermissionsWithVerb(
    requiredPermissions,
    verb,
  )
  const expandedRequiredPermissions = expandPermissionsWithVerbRecursively(
    requiredPermissions,
    verb,
  )

  if (
    anyPermissionMatches(
      expandedBaseRequiredPermissions,
      excludeExactPermissions,
    )
  ) {
    return false
  }

  if (
    anyPermissionMatches(
      expandedBaseRequiredPermissions,
      includeExactPermissions,
    )
  ) {
    return true
  }

  if (anyPermissionMatches(expandedRequiredPermissions, excludePermissions)) {
    return false
  }

  if (anyPermissionMatches(expandedRequiredPermissions, includePermissions)) {
    return true
  }

  return false
}

export function anyPermissionMatches(
  requiredPermissions: string[],
  grantingPermissions: string[],
) {
  return requiredPermissions.some((requiredPermission) => {
    return grantingPermissions.some((grantingPermission) => {
      return permissionMatches(
        stripNegation(requiredPermission),
        stripNegation(grantingPermission),
      )
    })
  })
}

export function createScopedPermission(...args: any[]) {
  return args.join(':')
}

export function expandPermissionsWithVerb(
  permissions: string[],
  verb?: string,
) {
  if (!verb) {
    return permissions
  }

  return permissions.map((permission) =>
    createScopedPermission(permission, verb),
  )
}

export function expandPermissionsWithVerbRecursively(
  permissions: string[],
  verb?: string,
) {
  if (!verb) {
    return permissions
  }

  return [verb].concat(
    permissions.flatMap((permission) => {
      const permissionParts = permission.split(':')

      return permissionParts.reduce((acc, _, index) => {
        return acc.concat(
          createScopedPermission(...permissionParts.slice(0, index + 1), verb),
        )
      })
    }),
  )
}

export function permissionMatches(
  requiredPermission: string,
  grantingPermission: string,
) {
  if (grantingPermission[0] === '=') {
    return grantingPermission.slice(1) === requiredPermission
  }

  if (grantingPermission === requiredPermission) {
    return true
  }

  if (grantingPermission == '*') {
    return true
  }

  const requiredScopes = requiredPermission.split(':')
  const grantingScopes = grantingPermission.split(':')

  if (grantingScopes.length > requiredScopes.length) {
    return false
  }

  return requiredScopes.every((requiredScope, index) => {
    const grantingScope = grantingScopes[index]

    return (
      grantingScope === '*' ||
      requiredScope === '*' ||
      grantingScope === requiredScope
    )
  })
}

export function partitionPermissions(permissions: string[]) {
  const excludeExactPermissions: string[] = []
  const includeExactPermissions: string[] = []
  const excludePermissions: string[] = []
  const includePermissions: string[] = []

  permissions.forEach((permission) => {
    if (permission.startsWith('-=')) {
      excludeExactPermissions.push(permission)
    } else if (permission.startsWith('=')) {
      includeExactPermissions.push(permission)
    } else if (permission.startsWith('-')) {
      excludePermissions.push(permission.slice(1))
    } else {
      includePermissions.push(permission)
    }
  })

  return {
    excludeExactPermissions,
    includeExactPermissions,
    excludePermissions,
    includePermissions,
  }
}

export function stripNegation(permission: string) {
  return permission[0] === '-' ? permission.slice(1) : permission
}
