import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { createUploadInterceptor } from './upload.interceptor';
import { AuthGuard } from 'src/helper/auth-guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('upload')
export class UploadController {
  // Single File Upload
  @Post('single')
  @UseInterceptors(
    createUploadInterceptor({
      fieldName: 'file',
      destination: './uploads/single',
      maxFileSize: 5 * 1024 * 1024, // 5 MB
      allowedMimeTypes: ['image/jpeg', 'image/png'],
    }),
  )
  async uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'Single file uploaded successfully',
      file,
    };
  }

  // Multiple Files Upload
  @Post('multiple')
  @UseInterceptors(
    createUploadInterceptor({
      fieldName: 'files',
      destination: './uploads/multiple',
      maxFiles: 5,
      maxFileSize: 5 * 1024 * 1024, // 5 MB
      allowedMimeTypes: ['image/jpeg', 'image/png'],
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return {
      message: 'Multiple files uploaded successfully',
      files,
    };
  }
}
