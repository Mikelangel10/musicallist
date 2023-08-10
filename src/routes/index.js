import { Router } from 'express'
import genres from './genres.js'
import groups from './groups.js'
import users from './users.js'

const router = Router()

router.use('/genres', genres)
router.use('/groups', groups)
router.use('/users', users)

export default router
