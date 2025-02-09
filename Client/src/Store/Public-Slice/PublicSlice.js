import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    events: [], 
    isLoading: false,
    data : null,
    singleEvent : null
};

export const fetchEventsAdmin = createAsyncThunk("/admin/fetchEvents",
    async()=>{
        try {
            const response = await axios.get("http://localhost:5000/api/public/get-all-event")
            return response.data;
        } catch (error) {
            console.error(error.message);
        }
    }
)

export const fetchSingleEvent = createAsyncThunk("/admin/singleEvent",
    async(id)=>{
        console.log("Async Thunk: ",id);
        
        try {
            const response = await axios.get(`http://localhost:5000/api/public/single-event/${id}`)
            return response.data;
        } catch (error) {
            console.error(error.message);
        }
    }
)


const publicSlice = createSlice({
    name: "public",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchEventsAdmin.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchEventsAdmin.fulfilled, (state, action) => {
            if (action?.payload?.success) {
                state.isLoading = false
                state.events = action?.payload?.events
            }
        })
        .addCase(fetchEventsAdmin.rejected,(state,action)=>{
            state.isLoading = false
            state.events = []
        })//------------------------- Fetch Single Events-------------------
        .addCase(fetchSingleEvent.pending,(state)=>{
            state.isLoading = true
        }).addCase(fetchSingleEvent.fulfilled,(state,action)=>{
            console.log(action?.payload);

            if (action?.payload?.success) {
                state.isLoading = false;
                state.singleEvent = action?.payload?.singleEvent
            }            
        }).addCase(fetchSingleEvent.rejected,(state,action)=>{
            console.log(action);
            
            state.isLoading = false
            state.singleEvent = null
        })
    }

})
export default publicSlice.reducer;