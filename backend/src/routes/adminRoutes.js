// routes/adminRoutes.js
import express from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { getAnalytics } from "../controllers/adminController.js";

const router = express.Router();

// Admin dashboard analytics
router.get("/analytics", requireAuth, requireRole(["admin"]), getAnalytics);

export default router;
