import React,{useState,useEffect} from "react";
import "./quotes.css";
import Result from "./result";
function Quotes(){
    const [result,setResult]=useState([]);
    useEffect(()=>{
        fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "c8cb6b8cccmshc02b57f0b5a8c98p1516cdjsnb64d72a5ad33",
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
      },
    })
      .then((response) => {
        return response.json()
      })
      .then(data=>{
          setResult([data]);
      })
      .catch((err) => {
        console.error(err);
      });
    },[])
    console.log("result=",result);
    const resultJSX=result.map(item=><Result content={item.content} />)
    return(
      <>
        <div id="quotes">
            Welcome to quotes generator website
        </div>
        {resultJSX}
      </>
    )
}

export default Quotes;
