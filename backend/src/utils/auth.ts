import * as jwt from 'jsonwebtoken'

export const JWT_SECRET = process.env.JWT_SECRET

export interface AuthTokenPayload {
  userId: number
  userOrganizationId?: number
}

export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
  const token = authHeader.replace('Bearer ', '')

  if (!token) {
    throw new Error('No token found')
  }
  return jwt.verify(token, JWT_SECRET) as AuthTokenPayload
}
