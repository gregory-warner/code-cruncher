import multer from 'multer';
import path from 'path';

// Configure multer to save files to the 'uploads' folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/img');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const createUploadMiddleware = (fieldName) => {
    return multer({ storage }).single(fieldName);
};

export default createUploadMiddleware;
