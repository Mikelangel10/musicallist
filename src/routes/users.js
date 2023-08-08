import { Router } from 'express'
import {
  getUsers,
  getUser,
  getUsersByGenre,
  getUsersByGroup,
  postUser,
  putUser,
  deleteUser
} from '../controllers/index.js'

const router = Router()

router.get('/', getUsers)
router.get('/:userId', getUser)
router.get('/genre/:genreId', getUsersByGenre)
router.get('/group/:groupId', getUsersByGroup)
router.post('/', postUser)
router.put('/:userId', putUser)
router.delete('/:userId', deleteUser)

export default router
