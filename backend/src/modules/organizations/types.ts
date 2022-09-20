import { z } from 'zod'
import { zodSortEnum } from '../../types/zod'

export const CreateOrganizationSchema = z.object({
  name: z.string(),
  description: z.nullable(z.optional(z.string())),
})

export type CreateOrganizationSchema = z.infer<typeof CreateOrganizationSchema>

export const GetManyOrganizationsSchema = z.object({
  filterString: z.optional(z.string()),
  skip: z.optional(z.number()),
  take: z.optional(z.number()),
  orderBy: z.optional(
    z.array(
      z.object({
        name: z.optional(zodSortEnum),
        description: z.optional(zodSortEnum),
      }),
    ),
  ),
})

export type GetManyOrganizationsFilterSchema = z.infer<
  typeof GetManyOrganizationsSchema
>

export const UpdateOrganizationSchema = z.object({
  name: z.optional(z.string()),
  description: z.optional(z.nullable(z.string())),
})

export type UpdateOrganizationSchema = z.infer<typeof UpdateOrganizationSchema>
