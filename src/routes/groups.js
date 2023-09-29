import { Router } from 'express'
import {
  getGroups,
  postGroup,
  deleteGroup,
  addGroupByIdToUserById
} from '../controllers/groups.js'

const router = Router()

router.get('/', getGroups)
router.post('/', postGroup)
router.delete('/:groupId', deleteGroup)
router.put('/:groupId', addGroupByIdToUserById)

export default router
