// middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // ✅ Log error with request ID
  console.error(`❌ Error [${req.id}]:`, err.stack);

  res.status(statusCode).json({
    success: false,
    requestId: req.id, // NEW: include request ID in response
    message,
    // Only include stack trace in development
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

