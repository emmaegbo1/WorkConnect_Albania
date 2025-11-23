import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  featured: { type: Boolean, default: false }, // flag for featured jobs

  // Applications linked to this job
  applications: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      cv: { type: String, required: true }, // URL to CV
      coverLetter: { type: String, required: true },
      date: { type: Date, default: Date.now },
      status: {
        type: String,
        enum: ["pending", "shortlisted", "rejected"],
        default: "pending",
      }, // recruiter/admin can update
    },
  ],
}, { timestamps: true }); // adds createdAt & updatedAt automatically

export default mongoose.model("Job", jobSchema);









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
