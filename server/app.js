import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import courseRoutes from './routes/courseRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import cookieParser from "cookie-parser";
import departmentRoutes from "./routes/departmentRoutes.js";
import professorRoutes from "./routes/professorRoutes.js";
import reviewRoutes from './routes/reviewRoutes.js';


dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true, // allow sending cookies
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/courses', courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes); // or "/api/protected"
app.use("/api/departments", departmentRoutes);
app.use("/api/professors", professorRoutes);
app.use('/api/reviews', reviewRoutes);

export default app;
