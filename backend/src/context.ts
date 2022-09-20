import { YogaInitialContext } from '@graphql-yoga/node'
import { Organization, PrismaClient, User } from '@prisma/client'
import { IncomingMessage, ServerResponse } from 'http'
import {
  AuthorizationTokenPaylod,
  decodeAuthHeader,
} from './core/authorization/jwt'

export interface Context {
  prisma: PrismaClient
  user: User | null
  organization: Organization | null
}

const prisma = new PrismaClient()

export const defaultContext: Context = {
  prisma: prisma,
  user: null,
  organization: null,
}

export async function extractUserFromDecodedToken(
  decodedToken: AuthorizationTokenPaylod,
) {
  const id = parseInt(decodedToken.sub, 10)

  if (isNaN(id)) {
    return null
  }

  return await prisma.user.findUnique({
    where: {
      id,
    },
  })
}

export async function extractOrganizationFromHeader(
  organizationIdentifier?: string,
) {
  if (!organizationIdentifier) {
    return null
  }

  const id = parseInt(organizationIdentifier, 10)

  if (isNaN(id)) {
    return null
  }

  return await prisma.organization.findUnique({
    where: {
      id,
    },
  })
}

export async function createContext(
  context: YogaInitialContext & { req: IncomingMessage; res: ServerResponse },
): Promise<Context> {
  const decodedToken = decodeAuthHeader(context.req.headers.authorization)

  if (!decodedToken) {
    return defaultContext
  }

  const user = await extractUserFromDecodedToken(decodedToken)

  const organizationHeader = context.req.headers[
    process.env.ORGANIZATION_HTTP_HEADER
  ] as string | undefined

  const organization = await extractOrganizationFromHeader(organizationHeader)

  return {
    ...defaultContext,
    user,
    organization,
  }
}
