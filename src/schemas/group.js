import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

export const groupSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required'
    })
    .min(1, 'Name must be at least 1 characters long')
    .max(50, 'Name must be at most 50 characters long'),
  fundationDate: z.number().int().min(-578).max(new Date().getFullYear()),
  genres: z.array(z.instanceof(isValidObjectId)),
  members: z.array(
    z
      .string({
        required_error: 'Members are required'
      })
      .min(3, 'Members must be at least 3 characters long')
      .max(20, 'Members must be at least 20 characters long')
  )
})

export const validateGroup = object => groupSchema.safeParse(object)

export const validatePartialGroup = object =>
  groupSchema.partial().safeParse(object)
