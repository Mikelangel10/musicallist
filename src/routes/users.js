import { Router } from 'express'
import {
  getUsers,
  getUser,
  getUsersByGenre,
  getUsersByGroup,
  postUser,
  putUser,
  putUserGenre,
  putUserGroup,
  deleteUser
} from '../controllers/users.js'

const router = Router()

router.get('/', getUsers)
router.get('/:userId', getUser)
router.get('/genre/:genreName', getUsersByGenre)
router.get('/group/:groupName', getUsersByGroup)
router.post('/', postUser)
router.put('/:userId', putUser)
router.put('/:userId/genre/:genreName', putUserGenre)
router.put('/:userId/group/:groupName', putUserGroup)
router.delete('/:userId', deleteUser)

export default router
