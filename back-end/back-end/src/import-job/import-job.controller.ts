import { Body, Controller, Get, HttpStatus, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImportJobService } from 'src/import-job/import-job.service';

@Controller('api')
export class ImportJobController {
    constructor(private importService: ImportJobService) { }

    //File upload and save to back-end
    @Post('csv/upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                return cb(null, `${file.originalname}`)
            }
        })
    })) uploadCover(@UploadedFile() file) {
        const filepath: string = `${file.path}`;
        console.log(filepath);
        return {
            file: filepath
        }
    }

    @Post('import-job')
    async addToDb(@Body('data') data: any) {
        console.log(data);
        this.importService.importData(data);
        return data;
    }
}
