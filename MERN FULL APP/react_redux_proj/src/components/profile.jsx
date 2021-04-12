import React from "react";
import {useSelector} from "react-redux";
import { Redirect } from "react-router-dom";
function Profile(){
    const loggedIn=useSelector(state=>state.userReducer).loggedIn;
    if(loggedIn===false){
        return <Redirect to="/login" />
    }
    return(
        <div id="profile">
            Welcome to Profile Page
        </div>
    )
}

export default Profile;