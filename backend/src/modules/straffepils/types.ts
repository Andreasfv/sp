import { z } from 'zod'
import { zodSortEnum } from '../../types/zod'

export const CreateStraffepilsSchema = z.object({
  giverId: z.number(),
  receiverId: z.number(),
  reason: z.optional(z.string()),
  amount: z.number(),
})

export type CreateStraffePilsSchema = z.infer<typeof CreateStraffepilsSchema>

export const GetManyStraffepilsFilterSchema = z.object({
  filterString: z.optional(z.string()),
  byReceiver: z.optional(z.number()),
  byGiver: z.optional(z.number()),
  organizationId: z.optional(z.number()),
  confirmed: z.optional(z.boolean()),
  skip: z.optional(z.number()),
  take: z.optional(z.number()),
})

export type GetManyStraffepilsFilterSchema = z.infer<
  typeof GetManyStraffepilsFilterSchema
>

export const getUserGivenStraffepilsFilter = z.object({
  filterString: z.optional(z.string()),
  byReceiver: z.optional(z.number()),
  byGiver: z.optional(z.number()),
  skip: z.optional(z.number()),
  take: z.optional(z.number()),
})

export const UpdateStraffepilsSchema = z.object({
  giverId: z.optional(z.number()),
  receiverId: z.optional(z.number()),
  reason: z.optional(z.string()),
  amount: z.optional(z.number()),
  confirmed: z.optional(z.boolean()),
})

export type UpdateStraffepilsSchema = z.infer<typeof UpdateStraffepilsSchema>
