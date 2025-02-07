import { configureStore } from "@reduxjs/toolkit";

// Slice 
import authReducer from "./Auth-Slice/AuthSlice.js"

export const store = configureStore({
    reducer: {
        auth : authReducer
    },
  })