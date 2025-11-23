import express from "express";
import Job from "../models/Job.js";
import { requireAuth, requireRole } from "../middleware/auth.js"; // ✅ include both

const router = express.Router();

// GET all jobs (public)
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

// GET featured jobs (public)
router.get("/featured", async (req, res) => {
  try {
    const jobs = await Job.find({ featured: true }).limit(6);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching featured jobs" });
  }
});

// GET single job by ID (public)
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job" });
  }
});

// POST new job (Recruiter/Admin only)
router.post("/", requireAuth, requireRole(["recruiter", "admin"]), async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: "Error creating job" });
  }
});

// PATCH toggle featured status (Recruiter/Admin only)
router.patch("/:id/featured", requireAuth, requireRole(["recruiter", "admin"]), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.featured = !job.featured;
    await job.save();
    res.json({ message: "Job updated", job });
  } catch (error) {
    res.status(500).json({ message: "Error updating job" });
  }
});

// DELETE job (Admin only)
router.delete("/:id", requireAuth, requireRole(["admin"]), async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job" });
  }
});

// POST job application (public)
router.post("/:id/apply", async (req, res) => {
  try {
    const { name, email, cv, coverLetter } = req.body;
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.applications = job.applications || [];
    job.applications.push({ name, email, cv, coverLetter, date: new Date(), status: "pending" });
    await job.save();

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting application" });
  }
});

// PATCH application status (Recruiter/Admin only)
router.patch("/:jobId/applications/:appIndex/status", requireAuth, requireRole(["recruiter", "admin"]), async (req, res) => {
  try {
    const { jobId, appIndex } = req.params;
    const { status } = req.body; // expected: "shortlisted" or "rejected"

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (!job.applications || !job.applications[appIndex]) {
      return res.status(404).json({ message: "Application not found" });
    }

    job.applications[appIndex].status = status;
    await job.save();

    res.json({ message: "Application status updated", application: job.applications[appIndex] });
  } catch (error) {
    res.status(500).json({ message: "Error updating application status" });
  }
});

export default router;










// // routes/jobs.js
// import express from "express";
// // import Job from "../models/Job.js";

// // const router = express.Router();

// // // GET featured jobs
// // router.get("/featured", async (req, res) => {
// //   try {
// //     const jobs = await Job.find({ featured: true }).limit(6); // limit for homepage
// //     res.json(jobs);
// //   } catch (error) {
// //     res.status(500).json({ message: "Error fetching featured jobs" });
// //   }
// // });

// // export default router;








// const express = require("express");
// const { verifyAccessToken } = require("../middleware/authMiddleware"); 
// const { authorizeRoles } = require("../middleware/roleMiddleware"); 
// const Job = require("../models/Job"); // Mongoose model

// const router = express.Router();

// /**
//  * @route   GET /api/jobs
//  * @desc    Get all jobs (public)
//  */
// router.get("/", async (req, res) => {
//   try {
//     const jobs = await Job.find();
//     res.json(jobs);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /**
//  * @route   GET /api/jobs/:id
//  * @desc    Get single job by ID (public)
//  */
// router.get("/:id", async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job) return res.status(404).json({ message: "Job not found" });
//     res.json(job);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /**
//  * @route   POST /api/jobs
//  * @desc    Create a new job (Recruiter/Admin only)
//  */
// router.post(
//   "/",
//   verifyAccessToken,
//   authorizeRoles("recruiter", "admin"),
//   async (req, res) => {
//     try {
//       const job = new Job(req.body);
//       await job.save();
//       res.status(201).json(job);
//     } catch (err) {
//       res.status(400).json({ message: "Invalid job data" });
//     }
//   }
// );

// /**
//  * @route   PUT /api/jobs/:id
//  * @desc    Update job (Recruiter/Admin only)
//  */
// router.put(
//   "/:id",
//   verifyAccessToken,
//   authorizeRoles("recruiter", "admin"),
//   async (req, res) => {
//     try {
//       const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//       });
//       if (!job) return res.status(404).json({ message: "Job not found" });
//       res.json(job);
//     } catch (err) {
//       res.status(400).json({ message: "Invalid update data" });
//     }
//   }
// );

// /**
//  * @route   DELETE /api/jobs/:id
//  * @desc    Delete job (Admin only)
//  */
// router.delete(
//   "/:id",
//   verifyAccessToken,
//   authorizeRoles("admin"),
//   async (req, res) => {
//     try {
//       const job = await Job.findByIdAndDelete(req.params.id);
//       if (!job) return res.status(404).json({ message: "Job not found" });
//       res.json({ message: "Job deleted successfully" });
//     } catch (err) {
//       res.status(500).json({ message: "Server error" });
//     }
//   }
// );

// module.exports = router;














// const express = require("express");
// const { verifyAccessToken } = require("../middleware/authMiddleware"); 
// const { authorizeRoles } = require("../middleware/roleMiddleware"); 
// const Job = require("../models/Job"); // Mongoose model

// const router = express.Router();

// /**
//  * @route   GET /api/jobs
//  * @desc    Get all jobs (public)
//  */
// router.get("/", async (req, res) => {
//   try {
//     const jobs = await Job.find();
//     res.json(jobs);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /**
//  * @route   GET /api/jobs/:id
//  * @desc    Get single job by ID (public)
//  */
// router.get("/:id", async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job) return res.status(404).json({ message: "Job not found" });
//     res.json(job);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /**
//  * @route   POST /api/jobs
//  * @desc    Create a new job (Recruiter/Admin only)
//  */
// router.post(
//   "/",
//   verifyAccessToken,
//   authorizeRoles("recruiter", "admin"),
//   async (req, res) => {
//     try {
//       const job = new Job(req.body);
//       await job.save();
//       res.status(201).json(job);
//     } catch (err) {
//       res.status(400).json({ message: "Invalid job data" });
//     }
//   }
// );

// /**
//  * @route   PUT /api/jobs/:id
//  * @desc    Update job (Recruiter/Admin only)
//  */
// router.put(
//   "/:id",
//   verifyAccessToken,
//   authorizeRoles("recruiter", "admin"),
//   async (req, res) => {
//     try {
//       const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//       });
//       if (!job) return res.status(404).json({ message: "Job not found" });
//       res.json(job);
//     } catch (err) {
//       res.status(400).json({ message: "Invalid update data" });
//     }
//   }
// );

// /**
//  * @route   DELETE /api/jobs/:id
//  * @desc    Delete job (Admin only)
//  */
// router.delete(
//   "/:id",
//   verifyAccessToken,
//   authorizeRoles("admin"),
//   async (req, res) => {
//     try {
//       const job = await Job.findByIdAndDelete(req.params.id);
//       if (!job) return res.status(404).json({ message: "Job not found" });
//       res.json({ message: "Job deleted successfully" });
//     } catch (err) {
//       res.status(500).json({ message: "Server error" });
//     }
//   }
// );

// module.exports = router;

