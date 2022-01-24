import { Body, Controller, Get, Param } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @Get('list')
    async list() {
        return this.fileService.getFileList()
    }

    @Get('detail/:id')
    async detail(@Param('id') id: string) {
        return this.fileService.getFileDetailById(id)
    }
}
