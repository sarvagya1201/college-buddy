import express from "express";
import {
  addOrUpdateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:courseId", authenticateUser, addOrUpdateReview);
router.delete("/:reviewId", authenticateUser, deleteReview);

export default router;
