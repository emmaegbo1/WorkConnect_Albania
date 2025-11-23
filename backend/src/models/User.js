// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    passwordHash: { type: String, required: true },
    roles: { type: [String], default: ["user"] },
    refreshToken: String, // optional storage for logout/invalidation
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);









// // models/User.js
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true }, // Add trim optionString,
//   email: { type: String, unique: true, required: true, lowercase: true },
//   passwordHash: {String, required: true },
//   roles: { type: [String], default: ["user"] },
//   resetPasswordToken: String,
//   resetPasswordExpiry: Date,
// },
// { timestamps: true }
// );

// // Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// export default mongoose.model("User", userSchema);
