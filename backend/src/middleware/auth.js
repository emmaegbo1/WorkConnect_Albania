// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verify JWT and attach user
export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Role-based access
export const requireRole = (roles) => (req, res, next) => {
  if (
    !req.user ||
    (!roles.includes(req.user.role) && !roles.some((r) => req.user.roles.includes(r)))
  ) {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};









// import jwt from "jsonwebtoken";

// export const requireAuth = (req, res, next) => {
//   const authHeader = req.headers.authorization || "";
//   const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     req.user = decoded;
//     next();
//   } catch {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// // Role-based access
// export const requireRole = (roles) => (req, res, next) => {
//   if (!req.user || !roles.some((role) => req.user.roles.includes(role))) {
//     return res.status(403).json({ message: "Forbidden" });
//   }
//   next();
// };









// import jwt from 'jsonwebtoken';

// export const requireAuth = (req, res, next) => {
//   const authHeader = req.headers.authorization || '';
//   const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

//   if (!token) return res.status(401).json({ message: 'Unauthorized' });

//   try {
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     req.user = decoded;
//     next();
//   } catch {
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };
