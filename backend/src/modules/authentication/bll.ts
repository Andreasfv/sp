import { User } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import { Context } from '../../context'
import { encodeJwtData } from '../../core/authorization/jwt'
import { BllResult, ErrorType, Fail, Ok } from '../../core/types'
import { CreateUserSchema } from '../users/types'

export async function signupUser(
  context: Context,
  createUserData: CreateUserSchema,
): Promise<BllResult<{ user: User; token: string }>> {
  const parseResult = CreateUserSchema.safeParse(createUserData)

  if (!parseResult.success) {
    return Fail({
      type: ErrorType.BadInput,
      description: parseResult.error.message,
    })
  }

  const data = parseResult.data
  const password = await hash(data.password, 10)

  const user = await context.prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: password,
      role: data.role,
      Organization: {
        connect: {
          id: data.organizationId || undefined,
        },
      },
    },
  })
  const token = encodeJwtData(user.id.toString())

  return Ok({ user, token })
}

export async function loginUser(
  context: Context,
  email: string,
  password: string,
): Promise<BllResult<{ user: User; token: string }>> {
  const user = await context.prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return Fail({
      type: ErrorType.NotFound,
    })
  }

  const passwordMatches = await compare(password, user.password)

  if (!passwordMatches) {
    return Fail({
      type: ErrorType.InvalidCredentials,
    })
  }

  const token = encodeJwtData(user.id.toString())

  return Ok({ user, token })
}
