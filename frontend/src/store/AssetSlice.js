import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchAssets = createAsyncThunk('assets/fetchAssets',async(_,thunkAPI)=>{
    try{
        const token = localStorage.getItem('access');
        // const response = await axios.get("http://127.0.0.1:8000/api/assets/",{
        const response = await axios.get("/api/assets/",{
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        return response.data.results|| response.data;
    } catch(error) {
        return thunkAPI.rejectWithValue(
            error.response?.data || 'failed to fetch assets'
        )
    }
});

export const addAsset = createAsyncThunk(
    'assets/addAsset',
    async (asset, thunkAPI) => {

        try {
            const token = localStorage.getItem('access');

            const response = await axios.post(
                // "http://127.0.0.1:8000/api/assets/",
                "/api/assets/",
                {
                    name: asset.name,
                    type: asset.type,
                    serial_number: asset.serialNumber,
                    status: asset.status,
                    purchase_date: asset.purchaseDate
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || 'Failed to add asset'
            );
        }
    }
);


export const updateAsset = createAsyncThunk(
    'assets/updateAsset',
    async (asset, thunkAPI) => {
        try {
            const token = localStorage.getItem('access');
            const response = await axios.put(
                // `http://127.0.0.1:8000/api/assets/${asset.id}/`,
                `/api/assets/${asset.id}/`,
                {
                    name: asset.name,
                    type: asset.type,
                    serial_number: asset.serialNumber,
                    status: asset.status,
                    purchase_date: asset.purchaseDate
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data || 'Failed to update asset'
            );
        }
    }
);


export const deleteAsset = createAsyncThunk(
    'assets/deleteAsset',
    async (id, thunkAPI) => {

        try {

            const token = localStorage.getItem('access');

            await axios.delete(
                // `http://127.0.0.1:8000/api/assets/${id}/`,
                `/api/assets/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            return id;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data || 'Failed to delete asset'
            );
        }
    }
);

const assetSlice = createSlice({

    name: 'assets',

    initialState: {
        items: [],
        loading: false,
        error: null
    },

    reducers: {},

    extraReducers: (builder) => {

        builder
            .addCase(fetchAssets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchAssets.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })

            .addCase(fetchAssets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        builder
            .addCase(addAsset.pending, (state) => {
                state.error = null;
            })

            .addCase(addAsset.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })

            .addCase(addAsset.rejected, (state, action) => {
                state.error = action.payload;
            });


        builder
            .addCase(updateAsset.fulfilled, (state, action) => {

                const index = state.items.findIndex(
                    asset => asset.id === action.payload.id
                );

                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })

            .addCase(updateAsset.rejected, (state, action) => {
                state.error = action.payload;
            });


        builder
            .addCase(deleteAsset.fulfilled, (state, action) => {

                state.items = state.items.filter(
                    asset => asset.id !== action.payload
                );

            })

            .addCase(deleteAsset.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});


export default assetSlice.reducer;
 