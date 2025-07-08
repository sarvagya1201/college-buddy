import  prisma  from "../models/prismaClient.js";

// POST /api/reviews/:courseId
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
    } = req.body;

    const overallRating = (
      (materialRating + gradingRating + attendanceRating + profRating) /
      4
    ).toFixed(1);

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
            overallRating: parseFloat(overallRating),
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
            overallRating: parseFloat(overallRating),
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
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting review" });
  }
};
