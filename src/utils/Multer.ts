import multer from "multer";

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `/company-${file.fieldname}.${ext}`);
    },
});


export const upload = multer({ storage: multerStorage });