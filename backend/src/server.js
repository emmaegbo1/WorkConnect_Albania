import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import * as rfs from "rotating-file-stream";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid"; // NEW
import { connectDB, disconnectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { validateEnv } from "./config/validateEnv.js";

// ✅ Import route modules
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import reportsRoutes from "./routes/reportsRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";

// ✅ Load and validate environment variables
dotenv.config();
const env = validateEnv(process.env);

const app = express();

// ✅ Setup rotating log streams
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "logs"),
});

const errorLogStream = rfs.createStream("error.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "logs"),
});

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Request ID middleware
app.use((req, res, next) => {
  req.id = uuidv4(); // assign unique ID
  next();
});

// ✅ Request logging (console + file)
morgan.token("id", (req) => req.id); // add custom token
app.use(morgan(":id :method :url :status :response-time ms", { stream: accessLogStream }));
app.use(morgan("dev")); // console logs
app.use(
  morgan("combined", {
    skip: (req, res) => res.statusCode < 400,
    stream: errorLogStream,
  })
);

// ✅ CORS setup
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
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
app.use("/api/jobs", jobRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/health", healthRoutes);

// ✅ Centralized error handler
app.use(errorHandler);

// ✅ Start server
const PORT = env.PORT;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// ✅ Graceful shutdown
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


