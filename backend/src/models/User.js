// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, lowercase: true },

    // Store hashed password, not plain text
    passwordHash: { type: String, required: true },

    // Single role for clarity, but can be extended
    role: {
      type: String,
      enum: ["candidate", "recruiter", "admin"],
      default: "candidate",
    },

    // Optional: support multiple roles if needed
    roles: { type: [String], default: ["candidate"] },

    // Tokens for authentication flows
    refreshToken: String, // for logout/invalidation
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);