// routes/reviewRoutes.js
import express from "express";
import {
  addOrUpdateReview,
  deleteReview,
  getMyReviews ,
} from "../controllers/reviewController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:courseId", authenticateUser, addOrUpdateReview);
router.delete("/:reviewId", authenticateUser, deleteReview);
router.get("/me", authenticateUser, getMyReviews);


export default router;
