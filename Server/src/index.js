import http from "http";
import { app } from "./app.js"
import dotenv from "dotenv";
import { dbConnect } from "./db/index.js";

import { initializeSocket } from "./Healper/socket.js"

dotenv.config({
    path: "./.env"
})
const PORT = process.env.PORT || 7000
const server = http.createServer(app);
const io = initializeSocket(server);
initializeSocket(server);



dbConnect()
    .then(() => {
        // Start HTTP Server (NOT app.listen)
        server.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error(`❌ FAILED TO CONNECT TO DATABASE: ${error.message}`);
    });