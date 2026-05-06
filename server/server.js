import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import aiRoutes from "./routes/aiRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import guestRoutes from "./routes/guestRoutes.js";

// 🔥 Load env FIRST
dotenv.config();

// 🔥 Connect DB
connectDB();

const app = express();

// 🔥 Middleware
app.use(cors());
app.use(express.json());

// 🔥 Debug log (important for AI issue)
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// 🔥 Routes
app.use("/api/ai", aiRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/guests", guestRoutes);

// 🔥 Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ❌ 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// 🔥 GLOBAL ERROR HANDLER (VERY IMPORTANT)
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

// 🔥 Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});