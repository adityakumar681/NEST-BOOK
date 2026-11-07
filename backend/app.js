const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Security headers
app.use(helmet());

// Frontend-backend communication
app.use(
  cors({
    origin: process.env.FRONTEND_URL || (
      process.env.NODE_ENV === "production"
        ? "https://book-nest-rose.vercel.app"
        : "http://localhost:3000"
    ),
    credentials: true,
  })
);

// Parse incoming JSON
app.use(express.json());

// Read cookies
app.use(cookieParser());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BookNest API is running",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Handle unknown routes
app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Centralized error handler (must be last)
app.use(errorMiddleware);

module.exports = app;