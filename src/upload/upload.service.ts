import { BadRequestException, Injectable } from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { existsSync, unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Injectable()
export class UploadService {
  generateFilename(file: Express.Multer.File): string {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    return `${file.fieldname}-${uniqueSuffix}${ext}`;
  }

  getMulterStorage(destination: string) {
    return diskStorage({
      destination,
      filename: (req, file, callback) => {
        const filename = this.generateFilename(file);
        callback(null, filename);
      },
    });
  }

  createUploadInterceptor(options: {
    fieldName: string;
    destination: string;
    maxFileSize?: number;
    maxFiles?: number;
    allowedMimeTypes?: string[];
    multiple?: boolean;
  }) {
    const {
      fieldName,
      destination,
      maxFileSize = 5 * 1024 * 1024,
      maxFiles = 5,
      allowedMimeTypes = ['image/jpeg', 'image/png'],
      multiple = false,
    } = options;

    const storage = this.getMulterStorage(destination);

    const fileFilter = (req, file, cb) => {
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new BadRequestException('Invalid file type'), false);
      }
    };

    const multerOptions: any = {
      storage,
      fileFilter,
      limits: {
        fileSize: maxFileSize,
        files: maxFiles,
      },
    };

    return multiple
      ? FilesInterceptor(fieldName, maxFiles, multerOptions)
      : FileInterceptor(fieldName, multerOptions);
  }

  createMultiFieldUploadInterceptor(options: {
    fieldNames: string[]; // e.g., ['images[0]', 'images[1]']
    destination: string;
    maxFileSize?: number;
    allowedMimeTypes?: string[];
  }) {
    const {
      fieldNames,
      destination,
      maxFileSize = 5 * 1024 * 1024,
      allowedMimeTypes = ['image/jpeg', 'image/png'],
    } = options;

    const storage = this.getMulterStorage(destination);

    const fileFilter = (req, file, cb) => {
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new BadRequestException('Invalid file type'), false);
      }
    };

    const fields = fieldNames.map((name) => ({ name, maxCount: 1 }));

    return FileFieldsInterceptor(fields, {
      storage,
      fileFilter,
      limits: {
        fileSize: maxFileSize,
      },
    });
  }

  // ✅ NEW: Delete a file from disk if it exists
  deleteFile(filePath: string, folder: string) {
    const fullPath = join(process.cwd(), 'uploads', folder, filePath);
    if (existsSync(fullPath)) {
      unlinkSync(fullPath);
    }
  }
}
