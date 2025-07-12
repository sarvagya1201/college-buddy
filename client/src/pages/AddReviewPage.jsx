// src/pages/AddReviewPage.jsx
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";
import { AuthContext } from "../context/authContext";

export default function AddReviewPage() {
  const { id } = useParams(); // courseId
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [attendanceRating, setAttendanceRating] = useState(1);
  const [gradingRating, setGradingRating] = useState(1);
  const [materialRating, setMaterialRating] = useState(1);
  const [profRating, setProfRating] = useState(1);
  const [error, setError] = useState("");

  const fetchCourse = async () => {
    try {
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data);
    } catch (err) {
      console.error("Failed to fetch course info:", err);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const computeOverallRating = () => {
    return (
      (attendanceRating + gradingRating + materialRating + profRating) / 4
    );
  };

  const handleSubmit = async () => {
    try {
      const overallRating = computeOverallRating();

      await api.post(`/reviews/${id}`, {
        reviewText,
        attendanceRating,
        gradingRating,
        materialRating,
        profRating,
        overallRating: parseFloat(overallRating.toFixed(1)),
      });

      navigate(`/courses/${id}`);
    } catch (err) {
      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data?.error?.includes("already reviewed")
      ) {
        setError("You have already submitted a review for this course.");
      } else {
        setError("Failed to submit review. Please try again.");
        console.error(err);
      }
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="text-center text-red-600 font-bold mt-10 text-xl">
          Please login to submit a review
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-2 text-blue-700">Add Review</h1>

        {course && (
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Reviewing:</span> {course.name} (
            {course.code})
          </p>
        )}

        {error && (
          <div className="text-red-600 mb-4 font-semibold">{error}</div>
        )}

        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review"
          className="w-full border p-2 rounded mb-4"
        />

        <div className="grid gap-3 mb-4">
          <div>
            <label className="block mb-1 font-medium">Attendance Rating (1–10)</label>
            <input
              type="number"
              value={attendanceRating}
              onChange={(e) => setAttendanceRating(Number(e.target.value))}
              className="border p-2 rounded w-full"
              min={1}
              max={10}
              step="1"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Grading Rating (1–10)</label>
            <input
              type="number"
              value={gradingRating}
              onChange={(e) => setGradingRating(Number(e.target.value))}
              className="border p-2 rounded w-full"
              min={1}
              max={10}
              step="1"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Material Rating (1–10)</label>
            <input
              type="number"
              value={materialRating}
              onChange={(e) => setMaterialRating(Number(e.target.value))}
              className="border p-2 rounded w-full"
              min={1}
              max={10}
              step="1"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Professor Rating (1–10)</label>
            <input
              type="number"
              value={profRating}
              onChange={(e) => setProfRating(Number(e.target.value))}
              className="border p-2 rounded w-full"
              min={1}
              max={10}
              step="1"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </div>
    </Layout>
  );
}
