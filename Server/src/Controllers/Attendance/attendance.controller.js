import { Attendance } from "../../Models/Attendance.model.js";

export const joinEvent = async (req, res) => {
  const { userId, eventId } = req.body;

  if (!userId || !eventId) {
    return res.status(400).json({ success: false, message: "User ID and Event ID are required" });
  }

  try {
    const alreadyJoined = await Attendance.findOne({ userId, eventId });

    if (alreadyJoined) {
      return res.status(400).json({ success: false, message: "User already joined this event" });
    }

    const attendance = new Attendance({ userId, eventId });
    await attendance.save();

    res.status(201).json({ success: true, message: "User joined event", attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const leaveEvent = async (req, res) => {
  const { userId, eventId } = req.body;

  if (!userId || !eventId) {
    return res.status(400).json({ success: false, message: "User ID and Event ID are required" });
  }

  try {
    await Attendance.findOneAndDelete({ userId, eventId });

    res.status(200).json({ success: true, message: "User left the event" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAttendees = async (req, res) => {
  try {
    const attendees = await Attendance.find({ eventId: req.params.eventId }).populate("userId", "name email");
    res.status(200).json({ success: true, attendees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
