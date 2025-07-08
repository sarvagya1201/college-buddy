// routes/professorRoutes.js
import express from "express";
import { createProfessor } from "../controllers/professorController.js";

const router = express.Router();
router.post("/", createProfessor);

export default router;
