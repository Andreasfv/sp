import { z } from 'zod'
import { zodSortEnum } from '../../types/zod'

export const CreateUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(['ADMIN', 'USER']),
  organizationId: z.number(),
})

export type CreateUserSchema = z.infer<typeof CreateUserSchema>

export const GetManyUsersFilterSchema = z.object({
  filterString: z.optional(z.string()),
  skip: z.optional(z.number()),
  take: z.optional(z.number()),
  orderBy: z.optional(
    z.array(
      z.object({
        firstName: z.optional(zodSortEnum),
        lastName: z.optional(zodSortEnum),
        email: z.optional(zodSortEnum),
        role: z.optional(zodSortEnum),
        organization: z.optional(zodSortEnum),
      }),
    ),
  ),
})

export type GetManyUsersFilterSchema = z.infer<typeof GetManyUsersFilterSchema>
