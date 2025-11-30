// controllers/recruiterController.js
import Job from "../models/Job.js";
import Application from "../models/Application.js";

// =============================
// Recruiter Job Management
// =============================

// ✅ Recruiter posts a new job
export const postJob = async (req, res, next) => {
  try {
    const recruiterId = req.user._id; // from requireAuth middleware
    const { title, description, company, location, salary } = req.body;

    if (!title || !description || !company) {
      const error = new Error("Title, description, and company are required");
      error.statusCode = 400;
      return next(error);
    }

    const job = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      recruiter: recruiterId,
      applications: [],
    });

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      data: job,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Recruiter views their own jobs
export const getRecruiterJobs = async (req, res, next) => {
  try {
    const recruiterId = req.user._id;
    const jobs = await Job.find({ recruiter: recruiterId }).populate(
      "applications.userId",
      "name email"
    );

    res.json({
      success: true,
      message: "Recruiter jobs fetched successfully",
      data: jobs,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Recruiter reviews a single application (basic review flow)
export const reviewApplication = async (req, res, next) => {
  try {
    const { id } = req.params; // applicationId
    const { status } = req.body; // expected: "shortlisted", "rejected", "hired"

    const application = await Application.findById(id).populate("candidate", "name email");
    if (!application) {
      const error = new Error("Application not found");
      error.statusCode = 404;
      return next(error);
    }

    application.status = status;
    await application.save();

    res.json({
      success: true,
      message: "Application reviewed successfully",
      data: application,
    });
  } catch (err) {
    next(err);
  }
};

// =============================
// Applicant Management
// =============================

// ✅ Get applicants for a specific job
export const getApplicants = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate("applications.userId", "name email role");
    if (!job) {
      const error = new Error("Job not found");
      error.statusCode = 404;
      return next(error);
    }

    const applications = await Application.find({ job: jobId }).populate(
      "candidate",
      "name email role"
    );

    res.json({
      success: true,
      message: "Applicants fetched successfully",
      data: {
        jobTitle: job.title,
        company: job.company,
        applicantsQuickView: job.applications,
        applicantsDetailed: applications,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Update single application status
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { jobId, applicationId } = req.params;

    const application = await Application.findById(applicationId);
    if (!application) {
      const error = new Error("Application not found");
      error.statusCode = 404;
      return next(error);
    }

    application.status = status;
    await application.save();

    await Job.updateOne(
      { _id: jobId, "applications.userId": application.candidate },
      { $set: { "applications.$.status": status } }
    );

    res.json({
      success: true,
      message: "Application status updated successfully",
      data: application,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Bulk update application statuses
export const bulkUpdateApplicationStatus = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { updates } = req.body;

    if (!Array.isArray(updates) || updates.length === 0) {
      const error = new Error("No updates provided");
      error.statusCode = 400;
      return next(error);
    }

    const results = [];

    for (const update of updates) {
      const { applicationId, status } = update;

      const application = await Application.findById(applicationId);
      if (!application) {
        results.push({ applicationId, success: false, error: "Application not found" });
        continue;
      }

      application.status = status;
      await application.save();

      await Job.updateOne(
        { _id: jobId, "applications.userId": application.candidate },
        { $set: { "applications.$.status": status } }
      );

      results.push({ applicationId, success: true, status });
    }

    res.json({
      success: true,
      message: "Bulk update completed successfully",
      data: results,
    });
  } catch (err) {
    next(err);
  }
};