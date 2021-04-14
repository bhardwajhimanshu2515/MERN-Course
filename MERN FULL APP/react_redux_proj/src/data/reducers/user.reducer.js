import {createSlice} from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{
        userInfo:[],
        loggedIn:false,
        ownerId:""
    },
    reducers:{
        signupFunction:(state,action)=>{
            console.log("action.payload=",action.payload);
            state.userInfo=action.payload;
            state.loggedIn=true;
            state.ownerId=action.payload.userId;
        },
        loginFunction:(state,action)=>{
            console.log("action.payload=",action.payload);
            state.userInfo=action.payload;
            state.loggedIn=true;
            state.ownerId=action.payload.userId;
        }
    }
});

export const {signupFunction,loginFunction}=userSlice.actions;
export default userSlice.reducer;