// Importación en desuso
// import { isValidObjectId } from 'mongoose'
import { z } from 'zod'
import { validateData } from '../middlewares/validations.js'

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

export const validateUser = object => validateData(userSchema, object)

export const validatePartialUser = object =>
  validatePartialData(userSchema, object)
