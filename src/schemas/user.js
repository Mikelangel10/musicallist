import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

export const userSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required'
    })
    .min(3, 'Name must be at least 3 characters long')
    .max(20, 'Name must be at most 20 characters long'),
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email()
})

export const validateUser = object => userSchema.safeParse(object)

export const validatePartialUser = object =>
  userSchema.partial().safeParse(object)
