// routes/auth.js
import express from "express";
import {
  register,
  login,
  refresh,
  logout,
  getUser,
  requestPasswordReset,
  resetPassword,
} from "../controllers/authController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Auth basics
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);   // POST is correct
router.post("/logout", logout);
router.get("/me", requireAuth, getUser);

// Password reset
router.post("/reset-password", requestPasswordReset);
router.post("/reset/:token", resetPassword);

// Example protected routes
router.get("/dashboard", requireAuth, requireRole(["user", "recruiter"]), (req, res) => {
  res.json({ message: "Dashboard access granted" });
});

router.get("/admin", requireAuth, requireRole(["admin"]), (req, res) => {
  res.json({ message: "Admin access granted" });
});

export default router;










// import express from 'express';
// import { register, login, refresh, logout } from '../controllers/authController.js';
// import crypto from "crypto";
// import User from "../models/User.js"; // your Mongoose user model
// import sendEmail from "../utils/sendEmail.js"; // utility to send emails
// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
// router.get('/refresh', refresh);
// router.post('/logout', logout);

// // Request password reset
// router.post("/reset-password", async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Generate reset token
//     const resetToken = crypto.randomBytes(32).toString("hex");
//     const resetTokenExpiry = Date.now() + 3600000; // 1 hour

//     // Save token + expiry in user record
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpiry = resetTokenExpiry;
//     await user.save();

//     // Send email with reset link
//     const resetLink = `http://localhost:3000/reset/${resetToken}`;
//     await sendEmail(
//       user.email,
//       "Password Reset Request",
//       `Click here to reset your password: ${resetLink}`
//     );

//     res.json({ message: "Password reset link sent to your email." });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Handle new password submission
// router.post("/reset/:token", async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   try {
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpiry: { $gt: Date.now() }, // not expired
//     });

//     if (!user) return res.status(400).json({ message: "Invalid or expired token" });

//     // Update password (hash before saving!)
//     user.password = password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpiry = undefined;
//     await user.save();

//     res.json({ message: "Password reset successful." });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;
