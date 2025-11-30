import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  cv: { type: String, required: true },       // URL to CV
  coverLetter: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["pending", "shortlisted", "rejected", "hired"], 
    default: "pending" 
  },
}, { timestamps: true });

export default mongoose.model("Application", applicationSchema);
