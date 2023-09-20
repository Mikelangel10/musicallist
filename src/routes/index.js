import { Router } from 'express'
import genres from './genres.js'
import groups from './groups.js'
import users from './users.js'
import auth from './auth.js'

const router = Router()

router.use('/genres', genres)
router.use('/groups', groups)
router.use('/users', users)
router.use('/auth', auth)

export default router
