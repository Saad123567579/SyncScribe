//authSlice.js
import {  createSlice } from '@reduxjs/toolkit';
//createAsyncThunk
const initialState = {
    user:null,
    allUsers:null,
    myDocs:null

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
        },
        setMyDocs:(state,action)=> {
            state.myDocs = action.payload
        }
        
          
    },
    extraReducers: (builder) => {
    },


});

export const { increment, setUser,setAllUser, setMyDocs } = userSlice.actions;
export default userSlice.reducer;