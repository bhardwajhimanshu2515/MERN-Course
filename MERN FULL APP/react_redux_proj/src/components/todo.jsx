import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoFunction } from "../data/reducers/todo.reducer";
import Single from "./single";
function Todo() {
  const dispatch = useDispatch();
  const ownerId = useSelector((state) => state.userReducer).ownerId;
  const todoList = useSelector((state) =>
    state.todoReducer
  ).todoList;
  useEffect(() => {
    let url = "http://localhost:5000/getAllTodo/" + ownerId;
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          try {
            let response = dispatch(todoFunction(data));
          } catch (err) {
            console.log(err);
          }
        } else {
          console.log("no data");
        }
      });
  },[]);
  const resultJSx=todoList.map(item=><Single title={item.title} description={item.description} deadline={item.deadline}/>)
  return (
    <div id="todo">
      {resultJSx}
    </div>
  );
}

export default Todo;
