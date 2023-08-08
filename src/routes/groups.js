import { Router } from 'express'
import { postGroup } from '../controllers/groups.js'

const router = Router()
router.post('/', postGroup)

export default router
