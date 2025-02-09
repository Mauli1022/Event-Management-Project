import express from "express";
import { 
    joinEvent, 
    leaveEvent, 
    getAttendees 
} from "../Controllers/Attendance/attendance.controller.js";

const router = express.Router();

router.post("/join", joinEvent);
router.delete("/leave", leaveEvent);
router.get("/event/:eventId", getAttendees);

export default router;

