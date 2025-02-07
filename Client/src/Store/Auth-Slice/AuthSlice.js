import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    token : null
}

export const registerUser = createAsyncThunk('/auth/register',
    async (formData) => {
        const response = await axios.post(" http://localhost:5000/api/user/register",formData)
        return response.data
    }
)

export const loginUser = createAsyncThunk('/auth/login',
    async (formData) => {
        const response = await axios.post(" http://localhost:5000/api/user/login",formData)
        return response.data
    }
)


const authSlice = createSlice({
    name : "Auth",
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading = true
        }).addCase(registerUser.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.isLoading = false
        }).addCase(registerUser.rejected,(state,action)=>{
            console.log(action.payload);
            state.isLoading = false
        })// ----------------------------------User Login--------------------------------------
        .addCase(loginUser.pending,(state)=>{
            state.isLoading = true
        }).addCase(loginUser.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.isLoading = false
        }).addCase(loginUser.rejected,(state,action)=>{
            console.log(action.payload);
            state.isLoading = false
        })
    }

})
// export const { setUser,resetTokenAndCredentials } = authSlice.actions
export default authSlice.reducer