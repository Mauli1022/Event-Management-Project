import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    events: [], 
    isLoading: false,
    data : null,
    singleEvent : null
};

export const fetchEventsAdmin = createAsyncThunk("/public/fetchEvents",
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
        try {
            const response = await axios.get(`http://localhost:5000/api/public/single-event/${id}`)
            return response.data;
        } catch (error) {
            console.error(error.message);
        }
    }
)

export const fetchEventsWithFilterValue = createAsyncThunk(
    "/public/fetchEventsWithFilterValue",
    async({ category, date }, { rejectWithValue })=>{
        try { 
            let url = "http://localhost:5000/api/public/filter";
            let queryParams = [];
      
            if (category) queryParams.push(`category=${category}`);
            if (date) queryParams.push(`date=${date}`);
      
            if (queryParams.length > 0) {
              url += `?${queryParams.join("&")}`;
            }
            const response = await axios.get(url);
            return response.data;
          } catch (error) {
            return rejectWithValue(error.response?.data || "Error fetching events");
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
            if (action?.payload?.success) {
                state.isLoading = false;
                state.singleEvent = action?.payload?.singleEvent
            }            
        }).addCase(fetchSingleEvent.rejected,(state,action)=>{
            console.log(action);
            
            state.isLoading = false
            state.singleEvent = null
        })// -----------------------------Fetch Events Basd On Filter-----------------------
        .addCase(fetchEventsWithFilterValue.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(fetchEventsWithFilterValue.fulfilled,(state,action)=>{
            // console.log("Async Thunk",action?.payload?.success);
            if (action?.payload?.success) {
                state.isLoading = false,
                state.events = action?.payload?.events
            }
        })
        .addCase(fetchEventsWithFilterValue.rejected,(state,action)=>{
            state.isLoading = false
            state.events = []
        })
    }

})
export default publicSlice.reducer;