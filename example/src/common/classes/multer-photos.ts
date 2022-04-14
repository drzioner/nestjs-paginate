import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { MimeTypesPhotos } from '@common/arrays';
import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { FileDestinations } from '@common/enums';

export class MulterPhotos implements MulterOptionsFactory {
  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    return {
      fileFilter(
        req: any,
        file: any,
        callback: (error: Error | null, acceptFile: boolean) => void,
      ) {
        const mimeType = MimeTypesPhotos.find((mime) => mime === file.mimetype);
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
      storage: diskStorage({
        destination: async (
          req,
          file,
          callback: (error: Error | null, filename: string | null) => void,
        ) => {
          const destination = req.body?.destination;
          if (destination) {
            const folder = FileDestinations[destination];
            if (folder) {
              try {
                const path = `./public/${folder}`;
                if (!existsSync(path)) {
                  mkdirSync(path);
                }
                callback(null, path);
              } catch (e) {
                callback(
                  new HttpException(
                    `Error loading file`,
                    HttpStatus.BAD_REQUEST,
                  ),
                  null,
                );
              }
            } else {
              callback(
                new HttpException(
                  `Invalid file destination`,
                  HttpStatus.BAD_REQUEST,
                ),
                null,
              );
            }
          } else {
            callback(
              new HttpException(
                `The file destination was not sent`,
                HttpStatus.BAD_REQUEST,
              ),
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
