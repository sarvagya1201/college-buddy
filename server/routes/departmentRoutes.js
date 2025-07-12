// routes/departmentRoutes.js
import express from "express";
import {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
  getCoursesByDepartmentCode,

} from "../controllers/departmentController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/requireRole.js";

const router = express.Router();

router.get("/", getAllDepartments);
router.post("/", authenticateUser, requireRole("admin"), createDepartment);
router.put("/:id", authenticateUser, requireRole("admin"), updateDepartment);
router.delete("/:id", authenticateUser, requireRole("admin"), deleteDepartment);
router.get("/:code/courses", getCoursesByDepartmentCode);

export default router;
