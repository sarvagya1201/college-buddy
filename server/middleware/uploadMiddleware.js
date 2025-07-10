import multer from "multer";

const storage = multer.memoryStorage(); // file will be in `req.file.buffer`

export const upload = multer({ storage });
