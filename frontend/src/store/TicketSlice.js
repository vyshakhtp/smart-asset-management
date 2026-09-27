import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchTicket=createAsyncThunk("tickets/fetchtickets",async(_,thunkAPI)=>{
    try{
        const token = localStorage.getItem("access");
        // const response = await axios.get("http://127.0.0.1:8000/api/tickets/",{
        const response = await axios.get("/api/tickets/",{
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        return response.data.results || response.data
    }catch(error){
        console.error("fetch ticket error:",error.response?.data);
        return thunkAPI.rejectWithValue(error.response?.data || "failed to fetch tickets")
    }
});

export const addTicket = createAsyncThunk("tickets/addtickets",async(ticket,thunkApi)=>{
    try{
        const token = localStorage.getItem("access");
        // const response = await axios.post("http://127.0.0.1:8000/api/tickets/",{
        const response = await axios.post("/api/tickets/",{
            asset : ticket.asset,
            issue : ticket.issue,
            status : ticket.status
        },{
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        return response.data;
    }catch(error){
        console.error("Add ticket error:",error.response?.data);
        return thunkApi.rejectWithValue(
            error.response?.data || "Failed to add ticket"
        );
    }

});

export const updateTicket = createAsyncThunk("tickets/updatetickets",async(ticket,thunkApi)=>{
    try{
        const token = localStorage.getItem("access");
        // const response = await axios.put(`http://127.0.0.1:8000/api/tickets/${ticket.id}/`,{
        const response = await axios.put(`/api/tickets/${ticket.id}/`,{
            asset : ticket.asset,
            issue : ticket.issue,
            status : ticket.status,
        },{
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        return response.data;
    }catch(error){
        console.error("Update ticket error:",error.response?.data);
        return thunkApi.rejectWithValue(
            error.response?.data || "Failed to update ticket"
        );
    }

});

export const deleteTicket = createAsyncThunk("tickets/deletetickets",async(id,thunkApi)=>{
    try{
        const token = localStorage.getItem("access");
        // await axios.delete(`http://127.0.0.1:8000/api/tickets/${id}/`,{
        await axios.delete(`/api/tickets/${id}/`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        return id;
    }catch(error){
        console.error("Delete ticket error:",error.response?.data);
        return thunkApi.rejectWithValue(
            error.response?.data || "Failed to delete ticket"
        );
    }

});

const ticketSlice = createSlice({
    name : 'tickets',
    initialState : {
        items : [],
        loading : false,
        error : null
    },
    reducers : {},
    extraReducers : (builder) =>{
        builder
        .addCase(fetchTicket.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTicket.fulfilled,(state,action)=>{
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchTicket.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        });

        builder
        .addCase(addTicket.pending,(state)=>{
            state.error = null;
        })
        .addCase(addTicket.fulfilled,(state,action)=>{
            state.items.push(action.payload);
        })
        .addCase(addTicket.rejected,(state,action)=>{
            state.error = action.payload;
        });

        builder
        .addCase(updateTicket.pending,(state)=>{
            state.error = null;
        })
        .addCase(updateTicket.fulfilled,(state,action)=>{
            const index = state.items.findIndex(ticket => ticket.id === action.payload.id); 
            state.items[index] = action.payload;
        })
        .addCase(updateTicket.rejected,(state,action)=>{
            state.error = action.payload;
        });

        builder
        .addCase(deleteTicket.pending,(state)=>{
            state.error = null;
        })
        .addCase(deleteTicket.fulfilled,(state,action)=>{
            state.items = state.items.filter(ticket=>ticket.id !== action.payload);
        })
        .addCase(deleteTicket.rejected,(state,action)=>{
            state.error = action.payload;
        });

    }
});

export default ticketSlice.reducer;