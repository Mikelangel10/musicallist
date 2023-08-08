import { Router } from 'express'
import { postGenres } from '../controllers/genres.js'

const router = Router()
router.post('/', postGenres)

export default router
