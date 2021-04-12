import {createSlice} from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{
        userInfo:[],
        loggedIn:false
    },
    reducers:{
        signupFunction:(state,action)=>{
            console.log("action.payload=",action.payload);
            state.userInfo=action.payload;
            state.loggedIn=true;
        }
    }
});

export const {signupFunction}=userSlice.actions;
export default userSlice.reducer;