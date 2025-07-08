import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
} from "../controllers/courseController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", authenticateUser, createCourse); // optional: admin check

export default router;
