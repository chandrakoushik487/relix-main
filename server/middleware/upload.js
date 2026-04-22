import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads dir exists
const dir = './uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Improved: Switch to diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const allowedExts = ['.jpg', '.jpeg', '.png'];
  
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedMimeTypes.includes(file.mimetype) && allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('INVALID_FILE_TYPE: Only JPG, JPEG, and PNG files are allowed.'), false);
  }
};

export const uploadLimitMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  }
});

const csvFileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.csv' || file.mimetype === 'text/csv') {
    cb(null, true);
  } else {
    cb(new Error('INVALID_FILE_TYPE: Only CSV files are allowed.'), false);
  }
};

export const uploadCsvMiddleware = multer({
  storage,
  fileFilter: csvFileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  }
});
