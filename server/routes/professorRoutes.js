// routes/professorRoutes.js
import express from "express";
import { createProfessor, getAllProfessors } from "../controllers/professorController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/requireRole.js"; 

const router = express.Router();

router.get("/", getAllProfessors);
router.post(
  "/",
  authenticateUser,
  requireRole("admin"),   // make sure this matches the string you store in the JWT
  createProfessor
);
export default router;
