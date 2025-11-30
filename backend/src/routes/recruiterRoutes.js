// routes/recruiterRoutes.js
import express from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import {
  getApplicants,
  updateApplicationStatus,
  bulkUpdateApplicationStatus,
  postJob,
  getRecruiterJobs,
  reviewApplication,
} from "../controllers/recruiterController.js";

const router = express.Router();

// Recruiter posts a job
router.post("/jobs", requireAuth, requireRole(["recruiter"]), postJob);

// Recruiter views their own jobs
router.get("/jobs", requireAuth, requireRole(["recruiter"]), getRecruiterJobs);

// Recruiter reviews an application
router.put("/applications/:id/review", requireAuth, requireRole(["recruiter"]), reviewApplication);

// Recruiter views applicants for a job
router.get("/jobs/:id/applicants", requireAuth, requireRole(["recruiter"]), getApplicants);

// Recruiter updates single application status
router.put(
  "/jobs/:jobId/applications/:applicationId/status",
  requireAuth,
  requireRole(["recruiter"]),
  updateApplicationStatus
);

// Recruiter bulk updates application statuses
router.put(
  "/jobs/:jobId/applications/bulk-update",
  requireAuth,
  requireRole(["recruiter"]),
  bulkUpdateApplicationStatus
);

export default router;