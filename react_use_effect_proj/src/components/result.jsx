import React from "react";
import "./result.css";

function Result(props){
    return(
        <div id="result">
            {props.content}
        </div>
    )
}

export default Result;