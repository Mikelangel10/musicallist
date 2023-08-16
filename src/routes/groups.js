import { Router } from 'express'
import { getGroups, postGroup, deleteGroup } from '../controllers/groups.js'

const router = Router()

router.get('/', getGroups)
router.post('/', postGroup)
router.delete('/:groupId', deleteGroup)

export default router
