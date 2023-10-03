import { Router } from 'express'
import { getToken, postLoginUser } from '../controllers/auth.js'
const router = Router()

router.get('/token', getToken)
router.post('/login', postLoginUser)
export default router
