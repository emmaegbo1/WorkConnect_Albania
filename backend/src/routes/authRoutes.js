// routes/auth.js
import express from "express";
import {
  register,
  login,
  refresh,
  logout,
  getUser,
  requestPasswordReset,
  resetPassword,
} from "../controllers/authController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Auth basics
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);   // POST is correct
router.post("/logout", logout);
router.get("/me", requireAuth, getUser);

// Password reset
router.post("/reset-password", requestPasswordReset);
router.post("/reset/:token", resetPassword);

// Example protected routes
router.get("/dashboard", requireAuth, requireRole(["user", "recruiter"]), (req, res) => {
  res.json({ message: "Dashboard access granted" });
});

router.get("/admin", requireAuth, requireRole(["admin"]), (req, res) => {
  res.json({ message: "Admin access granted" });
});

export default router;