import express from "express";
import { uploadNote } from "../controllers/noteController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", authenticateUser, upload.single("file"), uploadNote);

export default router;
