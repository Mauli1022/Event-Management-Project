import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    // origin : process.env.CLIENT_URL,
    methods : ['GET','POST','DELETE','PUT'],
}))

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

// Import All the Routes
import UserRoutes from "./Route/UserAuth.route.js";
import AdminRoutes from "./Route/Admin.route.js";
import GetAllEventsRoutes from "./Route/GetAllEvents.route.js"

// Socket.io
import AttendanceRoutes from "./Route/Attendance.route.js";

// use The Routes
app.use("/api/user",UserRoutes);
//admin Route
app.use("/api/admin",AdminRoutes);
// Public Route
app.use("/api/public",GetAllEventsRoutes);
// Socket.io
app.use("/api/public", AttendanceRoutes);

export { app };