import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchInventory = createAsyncThunk('inventory/fetchInventory',async(_,thunk_API) =>{
    try{
        const token = localStorage.getItem('access');
        // const response = await axios.get("http://127.0.0.1:8000/api/inventory/",{
        const response = await axios.get("/api/inventory/",{
            headers:{
                Authorization :`Bearer ${token}`
            }
        });
        return response.data.results || response.data;
    }catch(error){
    console.error("fetch inventory error",error.response?.data);
    return thunk_API.rejectWithValue(error.response?.data||"failed to fetch inventory" );
    }
});

export const addInventory = createAsyncThunk('inventory/addInventory',async(item,thunk_API) =>{
    try{
        const token = localStorage.getItem('access');
        // const response = await axios.post("http://127.0.0.1:8000/api/inventory/",{
        const response = await axios.post("/api/inventory/",{
            item_type : item.itemType,
            quantity : item.quantity,
            threshold : item.threshold,
        },{
            headers:{
                Authorization :`Bearer ${token}`
            }
        });
        return response.data;
    }catch(error){
    console.error("add inventory error",error.response?.data);
    return thunk_API.rejectWithValue(error.response?.data||"failed to add inventory" );
    }
});

export const updateInventory = createAsyncThunk('inventory/updateInventory',async(item,thunk_API) =>{
    try{
        const token = localStorage.getItem('access');
        // const response = await axios.put(`http://127.0.0.1:8000/api/inventory/${item.id}/`,{
        const response = await axios.put(`/api/inventory/${item.id}/`,{
            item_type : item.itemType,
            quantity : item.quantity,
            threshold : item.threshold,
        },{
            headers:{
                Authorization :`Bearer ${token}`
            }
        });
        return response.data;
    }catch(error){
    console.error("update inventory error",error.response?.data);
    return thunk_API.rejectWithValue(error.response?.data||"failed to update inventory" );
    }
});

export const deleteInventory = createAsyncThunk('inventory/deleteInventory',async(id,thunk_API) =>{
    try{
        const token = localStorage.getItem('access');
        // await axios.delete(`http://127.0.0.1:8000/api/inventory/${id}/`,{
        await axios.delete(`/api/inventory/${id}/`,{
            headers:{
                Authorization :`Bearer ${token}`
            }
        });
        return id;
    }catch(error){
    console.error("delete inventory error",error.response?.data);
    return thunk_API.rejectWithValue(error.response?.data||"failed to delete inventory" );
    }
});



const inventorySlice = createSlice({
    name : 'inventory',
    initialState : {
        items:[],
        loading:false,
        error:null
    },
    reducers : {},
    extraReducers :(builder)=>{
        builder
            .addCase(fetchInventory.pending,(state) =>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInventory.fulfilled,(state,action)=>{
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchInventory.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
            });

        builder
        .addCase(addInventory.pending,(state)=>{
            state.error = null;
        })
        .addCase(addInventory.fulfilled,(state,action)=>{
            state.items.push(action.payload);
        })
        .addCase(addInventory.rejected,(state,action)=>{
            state.error = action.payload;
        });

        builder
        .addCase(updateInventory.fulfilled,(state,action)=>{
            const index = state.items.findIndex(item=> item.id === action.payload.id);
            if (index !== -1){
                state.items[index] = action.payload;
            }
        })
        .addCase(updateInventory.rejected,(state,action)=>{
            state.error = action.payload;
        });

        builder
        .addCase(deleteInventory.fulfilled,(state,action) =>{
            state.items = state.items.filter(item => item.id !== action.payload);
        })
        .addCase(deleteInventory.rejected,(state,action)=>{
            state.error = action.payload;
        });

    }
});

export default inventorySlice.reducer;