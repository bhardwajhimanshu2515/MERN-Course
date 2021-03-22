import React, { useState } from "react";
import "./forms.css";
import Result from "./result";
function Forms() {
  const [number, setNumber] = useState("");
  
  const Increment=e=>{
      e.preventDefault();
      setNumber(parseInt(number)+1)
  }
  const Decrement=e=>{
    e.preventDefault();
    setNumber(parseInt(number)-1)
  }
  console.log(number);
  return (
    <>
      <div id="forms">
        <form>
          <input
            type="text"
            name="number"
            placeholder="Enter a number"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
        </form>
      </div>
      <div id="buttons">
          <button onClick={Increment}>Increment</button>
          <button onClick={Decrement}>Decrement</button>
      </div>
      <Result num={number} />
    </>
  );
}

export default Forms;
