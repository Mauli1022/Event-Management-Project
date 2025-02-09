import { configureStore } from "@reduxjs/toolkit";

// Slice 
import authReducer from "./Auth-Slice/AuthSlice.js"
import adminReducer from "./Admin-Slice/Admin-Slice.js"
import publicReducer from "./Public-Slice/PublicSlice.js"
import socketReducer from "./Socket-Slice/SocketSlice.js"

export const store = configureStore({
    reducer: {
        auth : authReducer,
        admin : adminReducer,
        public : publicReducer,
        socket : socketReducer
    },
  })