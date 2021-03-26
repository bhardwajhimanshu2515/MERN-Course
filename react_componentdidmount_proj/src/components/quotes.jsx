import React from "react";
import "./quotes.css";
import Result from "./result";
class Quotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
    };
  }
  componentDidMount() {
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
          this.setState({result:[data]})
      })
      .catch((err) => {
        console.error(err);
      });
  }
  render() {
    const resultjsx=this.state.result.map((item)=> <Result content={item.content}/>)
    return(
        <>
            <div id="hello">Welcome to Random Quotes Generator</div>
            {resultjsx}
        </>
    )
  }
}

export default Quotes;
