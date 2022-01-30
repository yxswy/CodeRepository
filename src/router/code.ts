import * as express from 'express'
import { getRepository } from 'typeorm'
import { FileEntity } from '../entity/File'

const router = express.Router()

router.get('/', async (req, res) => {
    const result = await getRepository(FileEntity).find()
    res.send('Hello Code')
})

router.get('/list', async (req, res) => {
    const result = await getRepository(FileEntity).find()
    res.json({
        data: {
            data_type: 'list',
            data: result,
            total: 0,
        },
        success: true,
        code: 200,
    })
})

router.get('/detail/:id', async (req, res) => {
    const respository = await getRepository(FileEntity)
    const item = await respository.findOne(req.params.id)
    res.json({
        code: 200,
        success: true,
        data: item || {},
    })
})

export default router
