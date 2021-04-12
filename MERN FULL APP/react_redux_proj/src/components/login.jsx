import React from "react";
import "./login.css";

function Login(){
    return(
        <div id="login">
            <form>
                <input type="email" placeholder="Email"></input><br />
                <input type="password" placeholder="Password"></input><br />
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login;