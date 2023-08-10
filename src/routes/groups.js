import { Router } from 'express'
import { getGroups, postGroup } from '../controllers/groups.js'

const router = Router()

router.get('/', getGroups)
router.post('/', postGroup)

export default router
