// routes/protectedRoutes.js
import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/requireRole.js";

const router = express.Router();

router.get("/dashboard", authenticateUser, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.userId}! This is a protected route.` });
});
router.get("/admin", authenticateUser, requireRole("admin"), (req, res) => {
  res.json({ message: "Welcome, Admin. This is your panel." });
});

router.get("/student", authenticateUser, requireRole("student"), (req, res) => {
  res.json({ message: "Hello student, here is your home page." });
});
router.get("/me", authenticateUser, (req, res) => {
  res.json({ user: req.user });
});


export default router;
