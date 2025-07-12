import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Landing() {
  const { user, authenticated } = useContext(AuthContext);
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15 },
    }),
  };

  const features = [
    {
      title: "Course Reviews",
      description:
        "Read and share honest reviews about your courses and professors.",
    },
    {
      title: "Upload Notes",
      description:
        "Share helpful materials and download peer-contributed notes.",
    },
    {
      title: "Department Listings",
      description: "Browse all departments and their respective courses.",
    },
    {
      title: "Professor Profiles",
      description: "Get insights into faculty based on student feedback.",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full bg-white/20 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 p-8 text-center"
        >
          <motion.h1
            className="text-4xl font-extrabold text-blue-800 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to College Buddy 👋
          </motion.h1>

          <motion.p
            className="text-gray-700 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Explore courses, departments, professors, and more. Join us to get
            started!
          </motion.p>

          {/* Main Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              ["/courses", "All Courses"],
              ["/professors", "All Professors"],
              ["/departments", "All Departments"],
            ].map(([path, label], i) => (
              <motion.div
                key={label}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <Link
                  to={path}
                  className="block px-4 py-3 bg-white/30 hover:bg-white/50 text-blue-800 font-semibold rounded-xl border border-white/40 shadow transition text-center"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </div>
{/* Add a Review Tile */}
<div className="flex justify-center mb-4">
  <motion.div
    custom={2.5}
    initial="hidden"
    animate="visible"
    variants={fadeIn}
    className="w-full max-w-sm"
  >
    <Link
      to="/select-review-course"
      className="block px-4 py-3 bg-white/30 hover:bg-white/50 text-blue-800 font-semibold rounded-xl border border-white/40 shadow transition text-center"
    >
      Add a Review
    </Link>
  </motion.div>
</div>


          {/* Centered Admin Card */}
          {user?.role === "admin" && (
            <div className="flex justify-center mb-8">
              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="w-full max-w-sm"
              >
                <Link
                  to="/admin"
                  className="block px-4 py-3 bg-white/30 hover:bg-white/50 text-blue-800 font-semibold rounded-xl border border-white/40 shadow transition text-center"
                >
                  Admin Controls
                </Link>
              </motion.div>
            </div>
          )}

          {/* Auth Links */}
          {!authenticated && (
            <div className="flex justify-center gap-4">
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
              >
                Register
              </Link>
            </div>
          )}
        </motion.div>

        {/* Static Features */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 w-full max-w-4xl">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.2 }}
              className="bg-white/40 backdrop-blur-md p-5 rounded-xl border border-white/30 shadow"
            >
              <h3 className="text-lg font-bold text-blue-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
