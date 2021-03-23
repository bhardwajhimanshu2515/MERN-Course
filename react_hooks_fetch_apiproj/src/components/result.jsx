import React from "react";
import "./result.css";

function Result(props){
    return(
        <div id="result">
            <div id="active">
                Active : {props.active}
            </div>
            <div id="cases">
                Cases :  {props.cases}
            </div>
        </div>
    )
}

export default Result;