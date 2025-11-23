import express from "express";
import User from "../models/User.js";
import { me } from "../controllers/userController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// ✅ Get current logged-in user
router.get("/me", requireAuth, me);

// ✅ Get all users (Admin only)
router.get("/", requireAuth, requireRole(["admin"]), async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// ✅ Update user role (Admin only)
router.patch("/:id/role", requireAuth, requireRole(["admin"]), async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.json({ message: "Role updated", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating role" });
  }
});

// ✅ Delete user (Admin only)
router.delete("/:id", requireAuth, requireRole(["admin"]), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

export default router;









// import express from 'express';
// import { me } from '../controllers/userController.js';
// import { requireAuth } from '../middleware/auth.js';
// const router = express.Router();

// router.get('/me', requireAuth, me);

// export default router;
