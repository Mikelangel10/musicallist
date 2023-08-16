import { Router } from 'express'
import { getGenres, postGenres, deleteGenre } from '../controllers/genres.js'

const router = Router()

router.get('/', getGenres)
router.post('/', postGenres)
router.delete('/:genreId', deleteGenre)

export default router
