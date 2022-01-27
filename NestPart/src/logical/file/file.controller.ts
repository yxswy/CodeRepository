import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { createWriteStream } from 'fs'
import { extname, join, resolve } from 'path'
import { FileService } from './file.service'

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('list')
  async list() {
    return this.fileService.getFileList()
  }

  @Get('detail/:id')
  async detail(@Param('id') id: string) {
    return this.fileService.getFileDetailById(id)
  }

  @Post('upload/single')
  // "file" 表示 上传文件的键名
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file, @Body() body) {
    //body为form/data中的其他非文件参数
    const musicFilesName = Date.now() + file['originalname']
    const musicFilesBuffer = file['buffer']
    const musicUrl = resolve(__dirname, '../../static/', musicFilesName)

    const whiteList = ['.ts', '.txt', '.js', '.md']
    const musicExtname = extname(musicUrl)
    if (whiteList.includes(musicExtname)) {
      const writeMusic = createWriteStream(musicUrl)
      writeMusic.write(musicFilesBuffer)

      // const res: any[] = await this.itemRepository.query('SELECT * FROM file_entity where id = ?', [id])
      const { fileName, fileTitle, fileContent, fileExtname } =
        await this.fileService.processLineByLine(musicUrl)

      this.fileService.saveData({
        fileName,
        fileTitle,
        fileContent,
        fileExtname,
        filePath: musicUrl,
      })

      return '上传成功'
    }
    return '文件类型异常'
  }
}
