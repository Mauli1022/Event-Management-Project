import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  timestamp: { type: Date, default: Date.now }
});

export const Attendance = mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);
