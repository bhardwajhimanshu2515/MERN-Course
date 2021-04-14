import {createSlice} from "@reduxjs/toolkit";

const todoSlice=createSlice({
    name:'todo',
    initialState:{
        todoList:[]
    },
    reducers:{
        todoFunction:(state,action)=>{
            console.log(action.payload);
            state.todoList=action.payload;
        }
    }
});

export const {todoFunction}=todoSlice.actions;
export default todoSlice.reducer;