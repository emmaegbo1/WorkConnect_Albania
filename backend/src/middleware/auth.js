import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Role-based access
export const requireRole = (roles) => (req, res, next) => {
  if (!req.user || !roles.some((role) => req.user.roles.includes(role))) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};









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
