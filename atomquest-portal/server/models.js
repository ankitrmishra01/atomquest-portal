import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ["EMPLOYEE", "MANAGER", "ADMIN"],
    default: "EMPLOYEE",
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  thrustArea: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Goal Schema
const goalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  thrustArea: { type: String, required: true },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cycleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cycle",
    required: true,
  },
  uomType: {
    type: String,
    enum: ["NUMERIC_PERCENT", "NUMERIC_VALUE", "TIMELINE", "ZERO_BASED"],
    required: true,
  },
  target: { type: Number, required: true },
  weightage: { type: Number, required: true, min: 0, max: 100 },
  status: {
    type: String,
    enum: ["DRAFT", "SUBMITTED", "APPROVED", "REJECTED", "LOCKED"],
    default: "DRAFT",
  },
  isShared: { type: Boolean, default: false },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  approvalNotes: String,
  rejectionReason: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Check-in Schema
const checkInSchema = new mongoose.Schema({
  goalId: { type: mongoose.Schema.Types.ObjectId, ref: "Goal", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cycleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cycle",
    required: true,
  },
  status: {
    type: String,
    enum: ["NOT_STARTED", "ON_TRACK", "COMPLETED"],
    default: "NOT_STARTED",
  },
  actualAchievement: Number,
  progressScore: Number,
  feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: "CheckInFeedback" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Cycle Schema
const cycleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  phase: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, default: "ACTIVE" },
  createdAt: { type: Date, default: Date.now },
});

// Audit Log Schema
const auditLogSchema = new mongoose.Schema({
  entity: { type: String, required: true },
  entityId: String,
  action: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  goalId: { type: mongoose.Schema.Types.ObjectId, ref: "Goal" },
  checkInId: { type: mongoose.Schema.Types.ObjectId, ref: "CheckIn" },
  changes: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now },
});

// Thrust Area Schema
const thrustAreaSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
export const Goal = mongoose.model("Goal", goalSchema);
export const CheckIn = mongoose.model("CheckIn", checkInSchema);
export const Cycle = mongoose.model("Cycle", cycleSchema);
export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
export const ThrustArea = mongoose.model("ThrustArea", thrustAreaSchema);
