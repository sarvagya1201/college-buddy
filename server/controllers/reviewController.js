// controllers/reviewController.js
import prisma from "../models/prismaClient.js";

// POST /api/reviews/:courseId
// GET /api/reviews/me
export const getMyReviews = async (req, res) => {
  try {
    const userId = req.user.userId;
    const reviews = await prisma.review.findMany({
      where: { userId },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(reviews);
  } catch (err) {
    console.error("Error fetching user reviews:", err);
    res.status(500).json({ error: "Failed to fetch your reviews" });
  }
};

export const addOrUpdateReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { courseId } = req.params;
    const {
      reviewText,
      materialRating,
      gradingRating,
      attendanceRating,
      profRating,
      overallRating,
    } = req.body;

    const existing = await prisma.review.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });

    const review = existing
      ? await prisma.review.update({
          where: { userId_courseId: { userId, courseId } },
          data: {
            reviewText,
            materialRating,
            gradingRating,
            attendanceRating,
            profRating,
            overallRating,
          },
        })
      : await prisma.review.create({
          data: {
            userId,
            courseId,
            reviewText,
            materialRating,
            gradingRating,
            attendanceRating,
            profRating,
            overallRating,
          },
        });

    res.status(200).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving review" });
  }
};

// DELETE /api/reviews/:reviewId
export const deleteReview = async (req, res) => {
  try {
    const review = await prisma.review.findUnique({
      where: { id: req.params.reviewId },
    });

    if (!review || review.userId !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await prisma.review.delete({ where: { id: req.params.reviewId } });
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting review" });
  }
};
