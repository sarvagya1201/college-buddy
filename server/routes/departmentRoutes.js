// routes/departmentRoutes.js
import express from "express";
import { createDepartment } from "../controllers/departmentController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/requireRole.js"; 

const router = express.Router();
router.post(
  "/",
  authenticateUser,
  requireRole("admin"),   // <-- or "ADMIN" if you store roles uppercase
  createDepartment
);

export default router;
