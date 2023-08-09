import { Router } from 'express'
import { getGenres, postGenres } from '../controllers/genres.js'

const router = Router()

router.get('/', getGenres)
router.post('/', postGenres)

export default router
