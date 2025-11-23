import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/tokens.js";
import sendEmail from "../utils/sendEmail.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.COOKIE_SECURE === "true",
  sameSite: "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    const payload = { id: user._id, email: user.email, roles: user.roles };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    res
      .cookie("refreshToken", refreshToken, cookieOptions)
      .status(201)
      .json({
        accessToken,
        user: { id: user._id, name: user.name, email: user.email, roles: user.roles },
      });
  } catch (err) {
    res.status(500).json({ message: "Server error during registration" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const payload = { id: user._id, email: user.email, roles: user.roles };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    res
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
        accessToken,
        user: { id: user._id, name: user.name, email: user.email, roles: user.roles },
      });
  } catch (err) {
    res.status(500).json({ message: "Server error during login" });
  }
};

export const refresh = async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });
  try {
    const decoded = verifyRefreshToken(token);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    const payload = { id: user._id, email: user.email, roles: user.roles };
    const accessToken = signAccessToken(payload);
    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      const decoded = verifyRefreshToken(token);
      const user = await User.findById(decoded.id);
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }
    res.clearCookie("refreshToken", { path: "/" });
    res.json({ message: "Logged out" });
  } catch (err) {
    res.status(500).json({ message: "Server error during logout" });
  }
};

export const getUser = async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    res.status(500).json({ message: "Server error fetching user" });
  }
};

// 🔑 Reset password request
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset/${token}`;
    await sendEmail(user.email, "Password Reset", `Click here to reset your password: ${resetLink}`);

    res.json({ message: "Password reset link sent" });
  } catch (err) {
    res.status(500).json({ message: "Server error during reset request" });
  }
};

// 🔑 Reset password confirm
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.passwordHash = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error during password reset" });
  }
};










// import bcrypt from 'bcrypt';
// import User from '../models/User.js';
// import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/tokens.js';

// const cookieOptions = {
//   httpOnly: true,
//   secure: process.env.COOKIE_SECURE === 'true',
//   sameSite: 'lax',
//   path: '/',
//   maxAge: 7 * 24 * 60 * 60 * 1000
// };

// export const register = async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });

//   const exists = await User.findOne({ email });
//   if (exists) return res.status(409).json({ message: 'Email already registered' });

//   const passwordHash = await bcrypt.hash(password, 10);
//   const user = await User.create({ name, email, passwordHash });

//   const payload = { id: user._id, email: user.email, roles: user.roles };
//   const accessToken = signAccessToken(payload);
//   const refreshToken = signRefreshToken(payload);

//   res
//     .cookie('refreshToken', refreshToken, cookieOptions)
//     .status(201)
//     .json({ accessToken, user: { id: user._id, name: user.name, email: user.email, roles: user.roles } });
// };

// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) return res.status(400).json({ message: 'All fields required' });

//   const user = await User.findOne({ email });
//   if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//   const match = await bcrypt.compare(password, user.passwordHash);
//   if (!match) return res.status(401).json({ message: 'Invalid credentials' });

//   const payload = { id: user._id, email: user.email, roles: user.roles };
//   const accessToken = signAccessToken(payload);
//   const refreshToken = signRefreshToken(payload);

//   res
//     .cookie('refreshToken', refreshToken, cookieOptions)
//     .json({ accessToken, user: { id: user._id, name: user.name, email: user.email, roles: user.roles } });
// };

// export const refresh = async (req, res) => {
//   const token = req.cookies?.refreshToken;
//   if (!token) return res.status(401).json({ message: 'No refresh token' });
//   try {
//     const decoded = verifyRefreshToken(token);
//     const payload = { id: decoded.id, email: decoded.email, roles: decoded.roles };
//     const accessToken = signAccessToken(payload);
//     res.json({ accessToken });
//   } catch {
//     res.status(401).json({ message: 'Invalid refresh token' });
//   }
// };

// export const logout = async (req, res) => {
//   res.clearCookie('refreshToken', { path: '/' });
//   res.json({ message: 'Logged out' });
// };

// export const getUser = async (req, res) => res.json({ user: req.user });