import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB, disconnectDB } from "./src/config/db.js";

// Import routes
import authRoutes from "./src/routes/auth.js";   // keep naming consistent
import userRoutes from "./src/routes/userRoutes.js";
import jobsRouter from "./src/routes/jobs.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS setup
app.use(
  cors({
    origin: process.env.CLIENT_URL, // e.g. http://localhost:5173
    credentials: true,              // allow cookies (refresh token)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Connect to DB
connectDB();

// ✅ Routes
app.get("/", (req, res) => res.send("WorkConnect Albania API"));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobsRouter);

// ✅ Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ✅ Graceful shutdown handlers
process.on("SIGINT", async () => {
  console.log("🔻 SIGINT received. Closing server...");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

process.on("SIGTERM", async () => {
  console.log("🔻 SIGTERM received. Closing server...");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});










// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const { connectDB, disconnectDB } = require('./src/config/db');

// // Import routes
// const authRoutes = require('./src/routes/authRoutes');
// const userRoutes = require('./src/routes/userRoutes');
// const jobsRouter = require('./src/routes/jobs');

// const app = express();

// // Middleware
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// app.use(cookieParser());
// app.use(express.json());

// // Connect to DB
// connectDB();

// // Routes
// app.get('/', (req, res) => res.send('WorkConnect Albania API'));
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/jobs', jobsRouter);

// // Start server
// const PORT = process.env.PORT || 5000;
// const server = app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// // Graceful shutdown handlers
// process.on('SIGINT', async () => {
//   console.log('🔻 SIGINT received. Closing server...');
//   server.close(async () => {
//     await disconnectDB();
//     process.exit(0);
//   });
// });

// process.on('SIGTERM', async () => {
//   console.log('🔻 SIGTERM received. Closing server...');
//   server.close(async () => {
//     await disconnectDB();
//     process.exit(0);
//   });
// });









// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const { connectDB, disconnectDB } = require('./src/config/db');

// const app = express();

// // middleware
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// app.use(cookieParser());
// app.use(express.json());

// // connect to DB
// connectDB();

// // start server
// const PORT = process.env.PORT || 5000;
// const server = app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// // Graceful shutdown handlers
// process.on('SIGINT', async () => {
//   console.log('🔻 SIGINT received. Closing server...');
//   server.close(async () => {
//     await disconnectDB();
//     process.exit(0);
//   });
// });

// process.on('SIGTERM', async () => {
//   console.log('🔻 SIGTERM received. Closing server...');
//   server.close(async () => {
//     await disconnectDB();
//     process.exit(0);
//   });
// });









// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const connectDB = require('./src/config/db'); // import connection

// const app = express();

// // middleware
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// app.use(cookieParser());
// app.use(express.json());

// // connect to DB
// connectDB();

// // start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });









// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import dotenv from 'dotenv';
// import { connectDB } from './config/db.js';
// import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js';

// dotenv.config();

// // ✅ Environment variables
// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;
// const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
// const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
// const CLIENT_URL = process.env.CLIENT_URL;
// const COOKIE_SECURE = process.env.COOKIE_SECURE === "true";

// const app = express();

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: CLIENT_URL,
//     credentials: true
//   })
// );

// connectDB();

// app.get('/', (req, res) => res.send('WorkConnect Albania API'));
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import dotenv from 'dotenv';
// import { connectDB } from './config/db.js';
// import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js';

// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true
//   })
// );

// connectDB();

// app.get('/', (req, res) => res.send('WorkConnect Albania API'));
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);

// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server running on port ${port}`));