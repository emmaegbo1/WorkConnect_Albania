// controllers/adminController.js
import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

export const getAnalytics = async (req, res, next) => {
  try {
    const usersByRole = await User.aggregate([
      { $group: { _id: "$role", total: { $sum: 1 } } }
    ]);

    const jobsPerRecruiter = await Job.aggregate([
      { $group: { _id: "$postedBy", total: { $sum: 1 } } }
    ]);

    const applicationsTrend = await Application.aggregate([
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          total: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json({
      success: true,
      message: "Analytics fetched successfully",
      data: {
        usersByRole,
        jobsPerRecruiter,
        applicationsTrend,
      },
    });
  } catch (err) {
    next(err); // Pass error to centralized handler
  }
};