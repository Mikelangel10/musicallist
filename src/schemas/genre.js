import { z } from 'zod'
import {
  validateData,
  validatePartialData
} from '../middlewares/validations.js'

export const genreSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required'
    })
    .min(3, 'Name must be at least 3 characters long')
    .max(20, 'Name must be at most 20 characters long')
})

export const validateGenre = object => validateData(genreSchema, object)

export const validatePartialGenre = object =>
  validatePartialData(genreSchema, object)
