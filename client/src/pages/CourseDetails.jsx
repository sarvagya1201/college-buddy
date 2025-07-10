import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";
import StarRating from "../components/StarRating";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Failed to load course details", err);
      }
    };
    fetchCourse();
  }, [id]);

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
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mt-8">No reviews submitted yet.</p>
        )}

        {/* Notes */}
        <div>
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
    </Layout>
  );
}
