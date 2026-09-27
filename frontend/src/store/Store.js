import { configureStore } from '@reduxjs/toolkit';
import assetreducer from './AssetSlice';
import inventoryReducer from './InventorySlice';
import ticketReducer from './TicketSlice';
import profileReducer from './ProfileSlice';

const Store = configureStore({
    reducer: {
        assets: assetreducer,
        inventory : inventoryReducer,
        tickets : ticketReducer,
        profile : profileReducer
    }
});

export default Store;