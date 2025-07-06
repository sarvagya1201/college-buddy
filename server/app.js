import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import courseRoutes from './routes/courseRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import cookieParser from "cookie-parser";

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

export default app;
