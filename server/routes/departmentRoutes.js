// routes/departmentRoutes.js
import express from "express";
import { createDepartment, getAllDepartments } from "../controllers/departmentController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/requireRole.js"; 

const router = express.Router();

router.get("/", getAllDepartments); 
router.post(
  "/",
  authenticateUser,
  requireRole("admin"),   // <-- or "ADMIN" if you store roles uppercase
  createDepartment
);

export default router;
