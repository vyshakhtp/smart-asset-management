import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchProfile = createAsyncThunk("profile/fetchProfile",async(_,thunkAPI)=>{
    try{
        const token = localStorage.getItem('access');
        // const response = await axios.get("http://127.0.0.1:8000/api/profile/",{
        const response = await axios.get("/api/profile/",{
            headers :{
                Authorization : `Bearer ${token}`
            }
        });
        return response.data
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data ||"failed to fetch profile")
    }
})

export const updateProfile = createAsyncThunk("profile/updateProfile",async(profile,thunkAPI)=>{
    try{
        const token = localStorage.getItem('access');
        // const response = await axios.put("http://127.0.0.1:8000/api/profile/",{
        const response = await axios.put("/api/profile/",{
            username : profile.username,
            email : profile.email
        },{
            headers :{
                Authorization : `Bearer ${token}`
            }
        });
        return response.data
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data ||"failed to update profile")
    }
})

const profileSlice = createSlice({
    name : 'profile',
    initialState : {
        username : "",
        email : "",
        role : '',
        loading:false,
        error:null
    },
    reducers : {},
    extraReducers : (builder) =>{
        builder
        .addCase(fetchProfile.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProfile.fulfilled,(state,action)=>{
            state.loading = false;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.role = action.payload.role;
        })
        .addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateProfile.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProfile.fulfilled,(state,action)=>{
            state.loading = false;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.role = action.payload.role;
        })
        .addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
    }
);

export default profileSlice.reducer;