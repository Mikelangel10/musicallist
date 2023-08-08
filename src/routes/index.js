import { Router } from 'express'
import users from './users.js'
import genres from './genres.js'
import groups from './groups.js'

const router = Router()

router.use('/users', users)
router.use('/genres', genres)
router.use('/groups', groups)

export default router
