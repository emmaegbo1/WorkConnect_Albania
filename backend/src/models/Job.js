import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  role: {
    type: String,
    enum: ["developer", "designer", "manager", "analyst", "marketing", "other"],
    required: true,
  },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "contract", "internship", "remote"],
    default: "full-time",
  },
  salaryRange: {
    min: { type: Number },
    max: { type: Number },
    currency: { type: String, default: "EUR" },
  },
  description: { type: String, required: true },
  requirements: [String],
  responsibilities: [String],
  benefits: [String],
  featured: { type: Boolean, default: false },

  // Link to recruiter/admin
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // Applications (lightweight references)
  applications: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        enum: ["pending", "shortlisted", "rejected"],
        default: "pending",
      },
      appliedAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);