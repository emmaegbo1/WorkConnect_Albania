// src/routes/healthRoutes.js
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res) => {
  const mongoConnected = mongoose.connection.readyState === 1;

  if (mongoConnected) {
    return res.status(200).json({
      status: "ok",
      server: "running",
      mongo: "connected",
      timestamp: new Date().toISOString(),
    });
  } else {
    return res.status(500).json({
      status: "error",
      server: "running",
      mongo: "disconnected",
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;

