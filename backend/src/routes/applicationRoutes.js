// routes/applicationRoutes.js
import express from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import {
  applyToJob,
  getUserApplications,
  getApplication,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

const router = express.Router();

// Candidate applies to a job
router.post("/:id/apply", requireAuth, requireRole(["candidate"]), applyToJob);

// Candidate views their applications
router.get("/user/me", requireAuth, requireRole(["candidate"]), getUserApplications);

// Recruiter/Admin views a specific application
router.get("/:id", requireAuth, requireRole(["recruiter", "admin"]), getApplication);

// Recruiter/Admin updates application status
router.put("/:id/status", requireAuth, requireRole(["recruiter", "admin"]), updateApplicationStatus);

export default router;
