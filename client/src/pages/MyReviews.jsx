import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    api.get("/reviews/me")
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch reviews", err);
        setLoading(false);
      });
  };

  const handleDelete = async (reviewId) => {
    const confirmed = window.confirm("Are you sure you want to delete this review?");
    if (!confirmed) return;

    try {
      await api.delete(`/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((review) => review.id !== reviewId));
    } catch (err) {
      console.error("Failed to delete review", err);
      alert("Failed to delete the review. Please try again.");
    }
  };

  if (loading) return <Layout>Loading your reviews...</Layout>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-12 p-4">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">My Reviews</h1>

        {reviews.length === 0 ? (
          <p className="text-gray-500">You haven't submitted any reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-4 rounded shadow">
                <p className="text-lg font-semibold text-blue-600 mb-1">
                  {review.course.name} ({review.course.code})
                </p>
                <p className="text-gray-700 italic mb-2">"{review.reviewText}"</p>
                <ul className="text-sm text-gray-800 grid grid-cols-2 gap-x-4">
                  <li><strong>Overall:</strong> {review.overallRating}/10</li>
                  <li><strong>Attendance:</strong> {review.attendanceRating}/10</li>
                  <li><strong>Grading:</strong> {review.gradingRating}/10</li>
                  <li><strong>Material:</strong> {review.materialRating}/10</li>
                  <li><strong>Professor:</strong> {review.profRating}/10</li>
                  <li><strong>Submitted:</strong> {new Date(review.createdAt).toLocaleDateString()}</li>
                </ul>
                <div className="mt-2 flex items-center gap-4">
                  <Link
                    to={`/courses/${review.courseId}/add-review`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit Review
                  </Link>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
