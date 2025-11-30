// routes/jobRoutes.js
import express from "express";
import Job from "../models/Job.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { applyToJob } from "../controllers/applicationController.js";

const router = express.Router();

// Public: anyone can view jobs
router.get("/", async (req, res, next) => {
  try {
    const jobs = await Job.find();
    res.json({
      success: true,
      message: "Jobs fetched successfully",
      data: jobs,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/featured", async (req, res, next) => {
  try {
    const jobs = await Job.find({ featured: true });
    res.json({
      success: true,
      message: "Featured jobs fetched successfully",
      data: jobs,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      const error = new Error("Job not found");
      error.statusCode = 404;
      return next(error);
    }
    res.json({
      success: true,
      message: "Job fetched successfully",
      data: job,
    });
  } catch (err) {
    next(err);
  }
});

// Recruiter/Admin: create job
router.post(
  "/",
  requireAuth,
  requireRole(["recruiter", "admin"]),
  async (req, res, next) => {
    try {
      const newJob = new Job({ ...req.body, postedBy: req.user._id });
      await newJob.save();
      res.status(201).json({
        success: true,
        message: "Job created successfully",
        data: newJob,
      });
    } catch (err) {
      next(err);
    }
  }
);

// Recruiter/Admin: update job
router.put(
  "/:id",
  requireAuth,
  requireRole(["recruiter", "admin"]),
  async (req, res, next) => {
    try {
      const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatedJob) {
        const error = new Error("Job not found");
        error.statusCode = 404;
        return next(error);
      }
      res.json({
        success: true,
        message: "Job updated successfully",
        data: updatedJob,
      });
    } catch (err) {
      next(err);
    }
  }
);

// Admin only: delete job
router.delete(
  "/:id",
  requireAuth,
  requireRole(["admin"]),
  async (req, res, next) => {
    try {
      const deletedJob = await Job.findByIdAndDelete(req.params.id);
      if (!deletedJob) {
        const error = new Error("Job not found");
        error.statusCode = 404;
        return next(error);
      }
      res.json({
        success: true,
        message: "Job deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
);

// Candidate only: apply to job
router.post(
  "/:id/apply",
  requireAuth,
  requireRole(["candidate"]),
  applyToJob
);

export default router;