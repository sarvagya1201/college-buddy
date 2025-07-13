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

  // Ratings stored as strings for input flexibility
  const [attendanceRating, setAttendanceRating] = useState("");
  const [gradingRating, setGradingRating] = useState("");
  const [materialRating, setMaterialRating] = useState("");
  const [profRating, setProfRating] = useState("");
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
    const total =
      Number(attendanceRating) +
      Number(gradingRating) +
      Number(materialRating) +
      Number(profRating);
    return total / 4;
  };

  const handleSubmit = async () => {
    if (
      !attendanceRating ||
      !gradingRating ||
      !materialRating ||
      !profRating
    ) {
      setError("Please provide all ratings before submitting.");
      return;
    }

    try {
      const overallRating = computeOverallRating();

      await api.post(`/reviews/${id}`, {
        reviewText,
        attendanceRating: Number(attendanceRating),
        gradingRating: Number(gradingRating),
        materialRating: Number(materialRating),
        profRating: Number(profRating),
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

  // Handlers to allow deletion and restrict 1–5 input only
  const handleRatingChange = (setter) => (e) => {
    const val = e.target.value;
    if (val === "" || /^[1-5]$/.test(val)) {
      setter(val);
    }
  };

  const handleRatingBlur = (setter) => (e) => {
    let val = parseInt(e.target.value);
    if (isNaN(val) || val < 1) val = 1;
    else if (val > 5) val = 5;
    setter(val.toString());
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
            <label className="block mb-1 font-medium">Attendance Rating (1–5)</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[1-5]"
              value={attendanceRating}
              onChange={handleRatingChange(setAttendanceRating)}
              onBlur={handleRatingBlur(setAttendanceRating)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Grading Rating (1–5)</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[1-5]"
              value={gradingRating}
              onChange={handleRatingChange(setGradingRating)}
              onBlur={handleRatingBlur(setGradingRating)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Material Rating (1–5)</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[1-5]"
              value={materialRating}
              onChange={handleRatingChange(setMaterialRating)}
              onBlur={handleRatingBlur(setMaterialRating)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Professor Rating (1–5)</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[1-5]"
              value={profRating}
              onChange={handleRatingChange(setProfRating)}
              onBlur={handleRatingBlur(setProfRating)}
              className="border p-2 rounded w-full"
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
