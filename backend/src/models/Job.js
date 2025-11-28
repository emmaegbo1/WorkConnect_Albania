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

  // Applications linked to this job
  applications: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: { type: String, required: true },
      email: { type: String, required: true },
      cv: { type: String, required: true }, // URL to CV
      coverLetter: { type: String, required: true },
      appliedAt: { type: Date, default: Date.now },
      status: {
        type: String,
        enum: ["pending", "shortlisted", "rejected"],
        default: "pending",
      },
    },
  ],
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);









// import mongoose from "mongoose";

// const jobSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   company: { type: String, required: true },
//   location: { type: String, required: true },
//   description: { type: String, required: true },
//   featured: { type: Boolean, default: false }, // flag for featured jobs

//   // Applications linked to this job
//   applications: [
//     {
//       name: { type: String, required: true },
//       email: { type: String, required: true },
//       cv: { type: String, required: true }, // URL to CV
//       coverLetter: { type: String, required: true },
//       date: { type: Date, default: Date.now },
//       status: {
//         type: String,
//         enum: ["pending", "shortlisted", "rejected"],
//         default: "pending",
//       }, // recruiter/admin can update
//     },
//   ],
// }, { timestamps: true }); // adds createdAt & updatedAt automatically

// export default mongoose.model("Job", jobSchema);









// models/Job.js
// import mongoose from "mongoose";

// const jobSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   company: { type: String, required: true },
//   location: { type: String, required: true },
//   description: { type: String, required: true },
//   featured: { type: Boolean, default: false }, // flag for featured jobs
// });

// export default mongoose.model("Job", jobSchema);
