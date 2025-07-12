import express from "express";
import {
  getAllCourses,
  getCourseById,
  getCourseDetails,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/requireRole.js"; 
const router = express.Router();

// Public routes
router.get("/", getAllCourses);
router.get("/:id", getCourseById); // or getCourseDetails

// Admin-protected routes
router.post("/", authenticateUser, requireRole("admin"), createCourse);
router.put("/:id", authenticateUser, requireRole("admin"), updateCourse);
router.delete("/:id", authenticateUser, requireRole("admin"), deleteCourse);


export default router;
