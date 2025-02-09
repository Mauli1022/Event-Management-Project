import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    events: [], // Stores all events
    isLoading: false, // Tracks API requests
};

export const createNewEvent = createAsyncThunk(
    "/admin/create-new-Event",
    async (eventData, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("authToken");

            if (!token) {
                return rejectWithValue({ message: "No authentication token found!" });
            }
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/create`,
                eventData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error?.response?.data ||
                { message: "Something Went Wrong While Creating new Event!" })
        }
    }
)


const adminSLice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createNewEvent.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createNewEvent.fulfilled, (state, action) => {
                        
            if (action?.payload?.success) {
                state.isLoading = false
            }
        })
        .addCase(createNewEvent.rejected,(state,action)=>{
            state.isLoading = false
        })
    }

})
export default adminSLice.reducer