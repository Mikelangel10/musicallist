import { Router } from 'express'
import {
  getGenres,
  postGenre,
  deleteGenre,
  addGenreByIdToUserById
} from '../controllers/genres.js'

const router = Router()

router.get('/', getGenres)
router.post('/', postGenre)
router.delete('/:genreId', deleteGenre)
router.put('/:genreId', addGenreByIdToUserById)

export default router
