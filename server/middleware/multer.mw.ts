import multer from "multer";

const disk = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "files/")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const memory = multer.memoryStorage();

const fileFilter = (
    req: any,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    if (!file.originalname.match(/.*\.(gif|jpe?g|bmp|png|webp)$/i)) {
        return cb(new Error("Error file type!"));
    }
    cb(null, true);
};

const upload = multer({
    storage: disk,
    limits: {
        fileSize: 1024 * 1024 * 4, // 4 MB limit
    },
    fileFilter,
});

const uploadStream = multer({
    storage: memory,
    limits: {
        files: 1024 * 1024 * 4,
    },
    fileFilter,
});


export { upload, uploadStream }