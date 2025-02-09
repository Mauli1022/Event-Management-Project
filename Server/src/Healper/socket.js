import { Server } from "socket.io";
import { Attendance } from "../Models/Attendance.model.js";

let io; // Store the instance

export const initializeSocket = (server) => {
  if (!io) { // Prevent re-initialization
    io = new Server(server, {
      cors: {
        origin: `${process.env.CLIENT_URL}`, // Your frontend URL
        methods: ["GET", "POST"]
      }
    });

    io.on("connection", (socket) => {
      console.log(`New WebSocket connection: ${socket.id}`);

      socket.on("joinEvent", async ({ userId, eventId, userName }) => {
        console.log(`User joined event: ${userName} (ID: ${userId}) in Event ${eventId}`);

        await Attendance.findOneAndUpdate(
          { eventId },
          { $addToSet: { attendees: { userId, userName } } }, 
          { upsert: true, new: true }
        );

        const updatedAttendance = await Attendance.findOne({ eventId });
        io.to(eventId).emit("updateAttendance", { eventId, attendees: updatedAttendance?.attendees || [] });
      });

      socket.on("leaveEvent", async ({ userId, eventId }) => {
        console.log(`User left event: User ID ${userId} from Event ${eventId}`);

        await Attendance.findOneAndUpdate(
          { eventId },
          { $pull: { attendees: { userId } } }, 
          { new: true }
        );

        const updatedAttendance = await Attendance.findOne({ eventId });
        io.to(eventId).emit("updateAttendance", { eventId, attendees: updatedAttendance?.attendees || [] });
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }

  return io;
};
