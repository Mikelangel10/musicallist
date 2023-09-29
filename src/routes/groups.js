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
router.delete('/:groupId', deleteGroup)
router.put('/:groupId', addGroupByIdToUserById)
router.delete('/:groupId', deleteGroupByIdToUserById)

export default router
