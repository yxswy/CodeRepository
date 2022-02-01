import * as express from 'express'
import { getRepository } from 'typeorm'
import { FileEntity } from '../entity/File'
import { readFileSync, writeFileSync, readdirSync, createReadStream } from 'fs'
import { join, resolve, basename, extname } from 'path'
import { createInterface } from 'readline'
import { red } from 'chalk'

const router = express.Router()

router.get('/', async (req, res) => {
    res.render('upload-file')
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

async function processLineByLine(filePath) {
    const fileStream = createReadStream(filePath)

    const fileName = basename(filePath)
    const fileExtname = extname(filePath).slice(1)

    const rl = createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    })

    let lineCount = 1
    let fileTitle = ''
    let fileContent = ''
    for await (const line of rl) {
        if (lineCount === 1) {
            fileTitle = line.slice(3)
        } else {
            fileContent = fileContent + line + '\r\n'
        }
        lineCount++
    }

    return {
        fileName,
        fileTitle,
        fileContent,
        fileExtname,
    }
}

router.post('/upload', async (req: any, res) => {
    try {
        const files: any[] = req.files || []
        if (files.length < 1) {
            throw new Error('文件异常')
        }
        const file = files[0]
        const originalname = file.originalname
        if (!originalname) {
            throw new Error('文件异常')
        }
        const tempPath = file.path
        const filePath = join(__dirname, '../../static', originalname) //文件名
        const data = readFileSync(tempPath)

        await writeFileSync(filePath, data)

        const { fileName, fileTitle, fileContent, fileExtname } =
            await processLineByLine(filePath)

        const respository = await getRepository(FileEntity)
        await respository.query(
            'INSERT INTO file_entity (file_name, file_path, file_extname, file_title, file_content)  VALUES  (?, ?, ?, ?, ?);',
            [fileName, filePath, fileExtname, fileTitle, fileContent]
        )
        console.log(fileName, filePath, fileExtname)

        const response = {
            message: 'File uploaded successfully.',
            filename: originalname,
        }
        res.json(response)
    } catch (e) {
        console.log(red(e))
        const response = {
            message: 'Failed to upload files.',
            detailedInformation: e,
        }
        res.json(response)
    }
})

export default router
