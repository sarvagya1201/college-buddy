
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import courseRoutes from "./routes/courseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import cookieParser from "cookie-parser";
import departmentRoutes from "./routes/departmentRoutes.js";
import professorRoutes from "./routes/professorRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import healthRoute from "./routes/healthRoutes.js";

// Remove dotenv.config() from here since it's now in index.js
const app = express();

dotenv.config();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // just one origin
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("✅ College Buddy Backend is running!");
});
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes); // or "/api/protected"
app.use("/api/departments", departmentRoutes);
app.use("/api/professors", professorRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/health", healthRoute);


export default app;