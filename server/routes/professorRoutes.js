// routes/professorRoutes.js
import express from "express";
import {
  createProfessor,
  getAllProfessors,
  updateProfessor,
  deleteProfessor,
} from "../controllers/professorController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/requireRole.js";

const router = express.Router();

router.get("/", getAllProfessors);
router.post("/", authenticateUser, requireRole("admin"), createProfessor);
router.put("/:id", authenticateUser, requireRole("admin"), updateProfessor);
router.delete("/:id", authenticateUser, requireRole("admin"), deleteProfessor);
export default router;
