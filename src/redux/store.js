import {configureStore} from '@reduxjs/toolkit';
import  searchSliceReducer from './slice/SearchSlice';

export const store = configureStore({
    reducer : {
        searchSliceReducer,
    }
});