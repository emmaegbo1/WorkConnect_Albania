import Application from "../models/Application.js";
import Job from "../models/Job.js";

// Candidate applies to a job
export const applyToJob = async (req, res, next) => {
  try {
    const { cv, coverLetter } = req.body;
    const jobId = req.params.id;
    const candidateId = req.user._id; // from requireAuth middleware

    // 1. Create Application document (full details)
    const application = await Application.create({
      candidate: candidateId,
      job: jobId,
      cv,
      coverLetter,
      status: "pending",
      appliedAt: new Date(),
    });

    // 2. Push lightweight reference into Job.applications
    await Job.findByIdAndUpdate(jobId, {
      $push: {
        applications: {
          userId: candidateId,
          status: "pending",
          appliedAt: new Date(),
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (err) {
    next(err); // Pass error to centralized handler
  }
};

// Candidate views their own applications
export const getUserApplications = async (req, res, next) => {
  try {
    const candidateId = req.user._id;
    const applications = await Application.find({ candidate: candidateId }).populate("job");

    res.json({
      success: true,
      message: "Applications fetched successfully",
      data: applications,
    });
  } catch (err) {
    next(err);
  }
};

// Recruiter/Admin views a specific application
export const getApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("candidate", "name email")
      .populate("job", "title description");

    if (!application) {
      const error = new Error("Application not found");
      error.statusCode = 404;
      return next(error);
    }

    res.json({
      success: true,
      message: "Application fetched successfully",
      data: application,
    });
  } catch (err) {
    next(err);
  }
};

// Recruiter/Admin updates application status
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body; // e.g. "accepted", "rejected", "interview"
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      const error = new Error("Application not found");
      error.statusCode = 404;
      return next(error);
    }

    res.json({
      success: true,
      message: "Application status updated successfully",
      data: application,
    });
  } catch (err) {
    next(err);
  }
};