import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, InsertResult, createQueryBuilder, getRepository, In } from 'typeorm';
import { FileEntity } from '../../entities/file.entity';
import { readdirSync, createReadStream } from 'fs';
import { resolve, basename, extname } from 'path';
import { createInterface } from 'readline'

@Injectable()
export class FileService {

    fileMap: Map<string, string>

    constructor(
        @InjectRepository(FileEntity)
        private readonly itemRepository: Repository<FileEntity>
    ) {
        this.itemRepository.query('SELECT * FROM file_entity').then(async (res: any[]) => {
            const filesPath = await this.readdir()

            filesPath.forEach(async filePath => {
                if (res.some(item => item.file_path === filePath)) {

                } else {
                    const { fileName, fileTitle, fileContent, fileExtname } = await this.processLineByLine(filePath)
                    await this.itemRepository.query(
                        'INSERT INTO file_entity (file_name, file_path, file_extname, file_title, file_content)  VALUES  (?, ?, ?, ?, ?);',
                        [fileName, filePath, fileExtname, fileTitle, fileContent]
                    )
                }
            })
        })
    }

    async getFileList() {
        const res: any[] = await this.itemRepository.query('SELECT * FROM file_entity')
        return {
            data: res,
            success: true,
            code: 200
        }
    }

    async getFileDetailById(id: string) {
        const res: any[] = await this.itemRepository.query('SELECT * FROM file_entity where id = ?', [id])
        return {
            data: res[0] || {},
            success: true,
            code: 200
        }
    }

    async readdir() {
        const dirPath = resolve(__dirname, '../../static')
        console.log('dirPath', dirPath)
        const files = await readdirSync(dirPath)
        return files.map(el => resolve(__dirname, '../../static', el))
    }

    async processLineByLine(filePath) {
        const fileStream = createReadStream(filePath);

        const fileName = basename(filePath)
        const fileExtname = extname(filePath).slice(1)

        const rl = createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        // Note: we use the crlfDelay option to recognize all instances of CR LF
        // ('\r\n') in input.txt as a single line break.

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
            fileName, fileTitle, fileContent, fileExtname
        }
    }
}
