import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'name',
    initialState:{
        searchItem:"flash"
    },
    reducers:{
        addUser(state , action){

            state.searchItem = action.payload;
            // console.log(action.payload);

        }
    }
});

export default userSlice.reducer;
export const {addUser} = userSlice.actions;