import { Router } from 'express'
import { getGenres, postGenre, deleteGenre } from '../controllers/genres.js'

const router = Router()

router.get('/', getGenres)
router.post('/', postGenre)
router.delete('/:genreId', deleteGenre)

export default router
