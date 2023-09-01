//authSlice.js
import {  createSlice } from '@reduxjs/toolkit';
//createAsyncThunk
const initialState = {
    user:null,
    allUsers:null

};




export const userSlice = createSlice({
    name: 'user',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        increment: (state) => {
            //do nothing 
        },
        setUser:(state,action)=> {
            state.user = action.payload
        },
        setAllUser:(state,action)=> {
            state.allUsers = action.payload
        }
        
          
    },
    extraReducers: (builder) => {
    },


});

export const { increment, setUser,setAllUser } = userSlice.actions;
export default userSlice.reducer;