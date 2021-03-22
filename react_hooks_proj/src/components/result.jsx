import React from "react";
import "./result.css";

function Result(props){
    return(
        <div id="result">
            {props.num}
        </div>
    )
}

export default Result;