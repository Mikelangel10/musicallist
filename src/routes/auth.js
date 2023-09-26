import { Router } from 'express'
import { getToken } from '../controllers/auth.js'
import { postLoginUser } from '../controllers/auth.js'
const router = Router()

router.get('/token', getToken)
router.post('/login', postLoginUser)
export default router
