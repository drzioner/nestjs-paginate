import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MimeTypesFiles } from '@common/arrays';
import { diskStorage } from 'multer';

export class MulterFiles implements MulterOptionsFactory {
  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    return {
      fileFilter(
        req: any,
        file: any,
        callback: (error: Error | null, acceptFile: boolean) => void,
      ) {
        const mimeType = MimeTypesFiles.find((mime) => mime === file.mimetype);
        if (mimeType) {
          callback(null, true);
        } else {
          callback(
            new HttpException(
              `Unsupported file type ${extname(file.originalname)}`,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
      },
      limits: { fileSize: 20000000 },
      storage: diskStorage({
        destination: async (
          req,
          file,
          callback: (error: Error | null, filename: string | null) => void,
        ) => {
          try {
            const path = `./public/temporary`;
            if (!existsSync(path)) {
              mkdirSync(path);
            }
            callback(null, path);
          } catch (e) {
            callback(
              new HttpException(`Error loading file`, HttpStatus.BAD_REQUEST),
              null,
            );
          }
        },
        filename(
          req,
          file,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const fileName = req.body?.filename;
          if (fileName) {
            const path = `${fileName}${extname(file.originalname)}`;
            callback(null, path);
          } else {
            const name = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            callback(null, `${name}${extname(file.originalname)}`);
          }
        },
      }),
    };
  }
}
