import React, { useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import { Redirect } from "react-router-dom";
function Profile(){
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [deadline,setDeadline]=useState("");
    const loggedIn=useSelector(state=>state.userReducer).loggedIn;
    const ownerId=useSelector(state=>state.userReducer).ownerId;
    //create Todo function
    const createTodo=async(e)=>{
        e.preventDefault();
        let payload={
            title:title,
            description:description,
            deadline:deadline,
            ownerId:ownerId
        }

        let url="http://localhost:5000/todoCreate";
        fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        })
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            console.log(data)
        })
        .catch(err=>{
            console.log(err);
        })
    }
    if(loggedIn===false){
        return <Redirect to="/login" />
    }
    return(
        <div id="profile">
            Welcome to Profile Page Create Todo Here
            <form>
                <input type="text" placeholder="Title" name="title" onChange={e=>{setTitle(e.target.value)}}></input><br />
                <input type="text" placeholder="Description" name="description" onChange={e=>{setDescription(e.target.value)}}></input><br />
                <input type="date" placeholder="Deadline" name="deadline" onChange={e=>{setDeadline(e.target.value)}}></input><br />
                <button onClick={createTodo}>Create Todo</button>
            </form>
        </div>
    )
}

export default Profile;