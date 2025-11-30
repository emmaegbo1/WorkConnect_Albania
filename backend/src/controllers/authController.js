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

// ✅ Register new user
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    const exists = await User.findOne({ email });
    if (exists) {
      const error = new Error("Email already registered");
      error.statusCode = 409;
      return next(error);
    }

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
        success: true,
        message: "Registration successful",
        data: {
          accessToken,
          user: { id: user._id, name: user.name, email: user.email, roles: user.roles },
        },
      });
  } catch (err) {
    next(err);
  }
};

// ✅ Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      return next(error);
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      return next(error);
    }

    const payload = { id: user._id, email: user.email, roles: user.roles };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    res
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
        success: true,
        message: "Login successful",
        data: {
          accessToken,
          user: { id: user._id, name: user.name, email: user.email, roles: user.roles },
        },
      });
  } catch (err) {
    next(err);
  }
};

// ✅ Refresh access token
export const refresh = async (req, res, next) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    const error = new Error("No refresh token");
    error.statusCode = 401;
    return next(error);
  }
  try {
    const decoded = verifyRefreshToken(token);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
      const error = new Error("Invalid refresh token");
      error.statusCode = 403;
      return next(error);
    }
    const payload = { id: user._id, email: user.email, roles: user.roles };
    const accessToken = signAccessToken(payload);

    res.json({
      success: true,
      message: "Access token refreshed successfully",
      data: { accessToken },
    });
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

// ✅ Logout user
export const logout = async (req, res, next) => {
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
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Get current user
export const getUser = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "User fetched successfully",
      data: req.user,
    });
  } catch (err) {
    next(err);
  }
};

// 🔑 Request password reset
export const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset/${token}`;
    await sendEmail(user.email, "Password Reset", `Click here to reset your password: ${resetLink}`);

    res.json({
      success: true,
      message: "Password reset link sent successfully",
    });
  } catch (err) {
    next(err);
  }
};

// 🔑 Reset password confirm
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    });
    if (!user) {
      const error = new Error("Invalid or expired token");
      error.statusCode = 400;
      return next(error);
    }

    user.passwordHash = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    next(err);
  }
};