import React, { useState } from "react";
import "./signup.css";
import { useDispatch, useSelector } from "react-redux";
import { signupFunction } from "../data/reducers/user.reducer";
import { Redirect } from "react-router-dom";
function Signup() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.userReducer).loggedIn;
  //create function for signup
  const signup = async (e) => {
    e.preventDefault();
    let payload = {
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    };
    console.log("payload=", payload);
    let url = "http://localhost:5000/signup";

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
                let response =dispatch(signupFunction(data));
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
  };
  if (loggedIn === true) {
    return <Redirect to="/profile" />;
  }
  return (
    <div id="signup">
      <form>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <br />
        <input
          type="tel"
          placeholder="PhoneNumber"
          name="phoneNumber"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        ></input>
        <br />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <br />
        <button onClick={signup}>Signup</button>
      </form>
    </div>
  );
}

export default Signup;
