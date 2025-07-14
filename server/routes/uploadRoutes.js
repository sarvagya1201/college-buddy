import express from "express";
// import { uploadNote } from "../controllers/noteController.js";
import { uploadNote, uploadDataFromExcel } from "../controllers/uploadController.js";

// import { uploadDataFromExcel } from "../controllers/adminController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Upload note (available to all authenticated users)
router.post("/notes", authenticateUser, upload.single("file"), uploadNote);

// Upload Excel data (admin only)
router.post("/admin/data", authenticateUser, upload.single("file"), uploadDataFromExcel);

export default router;
