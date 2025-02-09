import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: JSON.parse(sessionStorage.getItem("user")) || null,
    token: null
}

export const registerUser = createAsyncThunk('/register',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/register`, formData)
            return response.data
        } catch (error) {
            // console.log("Register API Error:", error.response?.data || error.message); // Debugging
            return rejectWithValue(error.response?.data || { message: "Something went wrong" });
        }
    }
)

export const loginUser = createAsyncThunk('/login',

    async (formData, { rejectWithValue }) => {

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`, formData)
            return response.data

        } catch (error) {
            return rejectWithValue(error?.response?.data || { messge: "Something Went Wrong" })
        }
    }
)

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            sessionStorage.removeItem("authToken");
          },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload?.success) {
                state.user = action?.payload?.user;
                state.isLoading = false
            } else {
                state.error = action?.payload?.message || "Registration failed!";
            }
        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.message || "Something went wrong";
        })// ----------------------------------User Login--------------------------------------
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            }).addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload?.success) {
                sessionStorage.setItem('authToken',action?.payload?.token);
                sessionStorage.setItem('user', JSON.stringify(action?.payload?.user));
                state.user = action?.payload?.user;
                state.isLoading = false
            } else {
                state.isLoading = false
                state.error = action?.payload?.message || "Sign In failed!";
            }
            }).addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Something went wrong";
            })
    }

})
export const { logout } = authSlice.actions;
export default authSlice.reducer