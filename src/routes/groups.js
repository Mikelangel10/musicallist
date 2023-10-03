import { Router } from 'express'
import {
  getGroups,
  postGroup,
  deleteGroup,
  addGroupByIdToUserById,
  deleteGroupByIdToUserById
} from '../controllers/groups.js'

const router = Router()

router.get('/', getGroups)
router.post('/', postGroup)
router.put('/:groupId', addGroupByIdToUserById)
router.delete('/:groupId', deleteGroup)
router.delete('/:userId/:groupId', deleteGroupByIdToUserById)

export default router
