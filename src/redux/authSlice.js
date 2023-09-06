//authSlice.js
import {  createSlice } from '@reduxjs/toolkit';
//createAsyncThunk
const initialState = {
    user:null,
    allUsers:null,
    myDocs:null,
    mySocket:null,
    currentDoc:null,


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
        },
        setSocket:(state,action)=> {
            state.mySocket = action.payload
        },
        setCurrentDoc:(state,action)=> {
            state.currentDoc = action.payload
        },
        delCurrentDoc:(state,action)=> {
            state.currentDoc = null
        },
        updateDocData:(state,action)=> {
            if(state.currentDoc){
                state.currentDoc.data = action.payload;
            }
           
        }



        
          
    },
    extraReducers: (builder) => {
    },


});

export const { increment, setUser,setAllUser, setMyDocs, setSocket ,setCurrentDoc,delCurrentDoc,updateDocData} = userSlice.actions;
export default userSlice.reducer;