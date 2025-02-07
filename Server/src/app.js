import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
    // origin : process.env.CLIENT_URL,
    methods : ['GET','POST','DELETE','PUT'],
}))

app.use(express.json())
app.use(express.urlencoded({extended : true}))

// Import All the Routes
import UserRoutes from "./Route/UserAuth.route.js";
import AdminRoutes from "./Route/Admin.route.js";

// use The Routes
app.use("/api/user",UserRoutes);


//admin Route
app.use("/api/admin",AdminRoutes);


export { app };