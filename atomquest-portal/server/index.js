import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/atomquest",
    );

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

connectDB();

// ============================================
// BASIC ROUTES
// ============================================

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "AtomQuest Portal API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      users: "/api/users",
      goals: "/api/goals",
      checkins: "/api/checkins",
      analytics: "/api/analytics",
    },
  });
});

// ============================================
// DEMO LOGIN ROUTE
// ============================================

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Demo Admin Login
  if (email === "admin@atomquest.com" && password === "admin123") {
    return res.json({
      success: true,
      message: "Login successful",
      user: {
        name: "Admin",
        role: "ADMIN",
        email,
      },
      token: "demo-token",
    });
  }

  // Demo Manager Login
  if (email === "manager@atomquest.com" && password === "manager123") {
    return res.json({
      success: true,
      message: "Login successful",
      user: {
        name: "Manager",
        role: "MANAGER",
        email,
      },
      token: "demo-token",
    });
  }

  // Demo Employee Login
  if (email === "employee@atomquest.com" && password === "employee123") {
    return res.json({
      success: true,
      message: "Login successful",
      user: {
        name: "Employee",
        role: "EMPLOYEE",
        email,
      },
      token: "demo-token",
    });
  }

  // Invalid credentials
  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: err.message,
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
