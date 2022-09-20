import * as jwt from 'jsonwebtoken'

export const APP_SECRET = 'GraphQL-is-aw3some'
export const ISSUER = 'Ur'

export interface AuthorizationTokenPaylod {
  sub: string
  exp: number
  iat: number
  iss: string
}

export function decodeAuthHeader(
  authHeader?: string,
): AuthorizationTokenPaylod | null {
  if (!authHeader) {
    return null
  }

  const token = authHeader.replace('Bearer ', '')

  if (!token) {
    throw new Error('No token found')
  }

  return jwt.verify(token, APP_SECRET) as AuthorizationTokenPaylod
}

export function encodeJwtData(sub: string): string {
  return jwt.sign({ sub }, APP_SECRET, {
    issuer: ISSUER,
    expiresIn: '30d',
  })
}
