import React, { useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginFunction } from "../data/reducers/user.reducer";
import { Redirect } from "react-router-dom";
function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    //create login function here
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.userReducer).loggedIn;
    const login=async(e)=>{
        e.preventDefault();
        let payload = {
            email: email,
            password: password,
          };
          console.log("payload=", payload);
          let url = "http://localhost:5000/login";

    //fetch
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.token) {
            try {
                let response =dispatch(loginFunction(data));
              } catch (err) {
                console.log(err);
              }
        } else {
          console.log("no data");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    if(loggedIn===true){
        return <Redirect to="/profile" />
    }
    return(
        <div id="login">
            <form>
                <input type="email" placeholder="Email" name="email" onChange={e=>{setEmail(e.target.value)}}></input><br />
                <input type="password" placeholder="Password" name="password" onChange={e=>{setPassword(e.target.value)}}></input><br />
                <button onClick={login}>Login</button>
            </form>
        </div>
    )
}

export default Login;