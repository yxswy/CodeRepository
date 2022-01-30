import * as express from 'express'
import codeRouter from './router/code'

const router = express.Router()

router.use('/api/code', codeRouter)

export default router
