import express from "express";
import Job from "../models/Job.js";
import User from "../models/User.js";

const router = express.Router();

// GET platform reports (Admin only)
router.get("/", async (req, res) => {
  try {
    const jobsCount = await Job.countDocuments();
    const applicationsCount = await Job.aggregate([
      { $unwind: "$applications" },
      { $count: "total" }
    ]);
    const usersCount = await User.countDocuments();

    res.json({
      jobs: jobsCount,
      applications: applicationsCount[0]?.total || 0,
      users: usersCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports" });
  }
});

export default router;
