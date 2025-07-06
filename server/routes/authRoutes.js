import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authenticateUser, (req, res) => {
  res.json({
    userId: req.user.userId,
    role: req.user.role,
  });
});

export default router;