import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'name',
    initialState:{
        searchItem:"flash",
        searchItem2:"flash",
    },
    reducers:{
        searchByName(state , action){

            state.searchItem = action.payload;
        },
        searchByNL(state, action){
            state.searchItem2 = action.payload;
        }
    }
});

export default userSlice.reducer;
export const {searchByName, searchByNL} = userSlice.actions;