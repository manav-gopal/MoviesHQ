import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'name',
    initialState:{
        searchItem:"flash",
    },
    reducers:{
        searchByName(state , action){

            state.searchItem = action.payload;
        },
    }
});

export default userSlice.reducer;
export const {searchByName} = userSlice.actions;