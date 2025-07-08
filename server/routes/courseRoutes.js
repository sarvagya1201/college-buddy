import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  getCourseDetails, 
} from "../controllers/courseController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.get("/:id", getCourseDetails);
router.post("/", authenticateUser, createCourse); // optional: admin check

export default router;
