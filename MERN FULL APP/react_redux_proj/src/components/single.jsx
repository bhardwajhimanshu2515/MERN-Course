import React from "react";

function Single(props) {
  return (
    <div className="singleTodo" style={{backgroundColor:"black",marginBottom:"25px",color:"white",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center",width:"30%"}}>
      <div className="title">{props.title}</div>
      <div className="desc">{props.description}</div>
      <div className="deadline">{props.deadline}</div>
    </div>
  );
}

export default Single;
