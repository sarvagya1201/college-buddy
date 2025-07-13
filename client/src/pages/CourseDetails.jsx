// src/pages/CourseDetail.jsx
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";
import StarRating from "../components/StarRating";
import { AuthContext } from "../context/authContext";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const fetchCourse = async () => {
    try {
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data);
    } catch (err) {
      console.error("Failed to load course details", err);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const confirmDelete = (reviewId) => {
    setReviewToDelete(reviewId);
    setShowConfirm(true);
  };

  const proceedDelete = async () => {
    try {
      await api.delete(`/reviews/${reviewToDelete}`);
      setShowConfirm(false);
      setReviewToDelete(null);
      fetchCourse(); // Refresh reviews
    } catch (err) {
      alert("Failed to delete review.");
      console.error(err);
    }
  };

  if (!course) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">{course.name}</h1>
        <p className="text-gray-600 mb-2">Code: {course.code}</p>
        <p className="text-gray-600 mb-2">Type: {course.type}</p>
        <p className="text-gray-600 mb-2">
          Semesters: {course.semesters?.join(", ")}
        </p>
        <p className="text-gray-600 mb-2">
          Department: {course.department?.name}
        </p>
        <p className="text-gray-600 mb-6">
          Professor: {course.professor?.name} ({course.professor?.email})
        </p>

        {course.ratings && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Average Ratings</h2>
            <ul className="text-sm space-y-2">
              {course.ratings.overall !== undefined && (
                <li className="flex items-center gap-2">
                  Overall: {course.ratings.overall.toFixed(2)}
                  <StarRating value={course.ratings.overall} />
                </li>
              )}
              {course.ratings.attendance !== undefined && (
                <li className="flex items-center gap-2">
                  Attendance: {course.ratings.attendance.toFixed(2)}
                  <StarRating value={course.ratings.attendance} />
                </li>
              )}
              {course.ratings.grading !== undefined && (
                <li className="flex items-center gap-2">
                  Grading: {course.ratings.grading.toFixed(2)}
                  <StarRating value={course.ratings.grading} />
                </li>
              )}
              {course.ratings.material !== undefined && (
                <li className="flex items-center gap-2">
                  Material: {course.ratings.material.toFixed(2)}
                  <StarRating value={course.ratings.material} />
                </li>
              )}
              {course.ratings.prof !== undefined && (
                <li className="flex items-center gap-2">
                  Professor: {course.ratings.prof.toFixed(2)}
                  <StarRating value={course.ratings.prof} />
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Reviews */}
        {course.reviews?.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-3">Student Reviews</h2>
            <div className="space-y-4">
              {course.reviews.map((review) => (
                <div key={review.id} className="bg-white p-4 rounded shadow">
                  <p className="text-gray-800 italic mb-2">
                    "{review.reviewText}"
                  </p>
                  <ul className="text-sm text-gray-700 grid grid-cols-2 gap-x-4">
                    <li>
                      <strong>Overall:</strong> {review.overallRating}/5
                    </li>
                    <li>
                      <strong>Attendance:</strong> {review.attendanceRating}/5
                    </li>
                    <li>
                      <strong>Grading:</strong> {review.gradingRating}/5
                    </li>
                    <li>
                      <strong>Material:</strong> {review.materialRating}/5
                    </li>
                    <li>
                      <strong>Professor:</strong> {review.profRating}/5
                    </li>
                    <li>
                      <strong>Date:</strong>{" "}
                      {new Date(review.createdAt).toLocaleDateString()}
                    </li>
                  </ul>

                  {(user?.id === review.userId || user?.role === "admin") && (
                    <button
                      onClick={() => confirmDelete(review.id)}
                      className="mt-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete Review
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mt-8">No reviews submitted yet.</p>
        )}

        {/* Add Review Button */}
        {user && (
          <div className="mt-6">
            <button
              onClick={() => navigate(`/courses/${id}/add-review`)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Your Review
            </button>
          </div>
        )}

        {/* Notes Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-2">Notes</h2>
          {course.notes?.length > 0 ? (
            <div className="space-y-3">
              {course.notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white p-4 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-blue-600">{note.title}</p>
                    <p className="text-sm text-gray-600">
                      Uploaded by {note.uploadedBy.name} on{" "}
                      {new Date(note.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={note.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View
                    </a>
                    <a
                      href={note.fileUrl}
                      download
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No notes uploaded yet.</p>
          )}
        </div>
      </div>

      {/* 🔴 Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this review?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={proceedDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
