import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as fileType from 'file-type';

// type ValidFileExt = 'png' | 'jpg' | 'jpeg';
type ValidMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

export const saveImageToStorage = {
  storage: diskStorage({
    destination: './photos',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extArray = file.mimetype.split('/');
      const extension = extArray[extArray.length - 1];
      const filename = `photo-${uniqueSuffix}.${extension}`;
      callback(null, filename);
    },
  }),
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes: ValidMimeType[] = [
      'image/png',
      'image/jpg',
      'image/jpeg',
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};
