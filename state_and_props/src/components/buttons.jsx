import React from "react";
import "./buttons.css";
import Result from "./result";

class Buttons extends React.Component{
    constructor(props){
        super(props);
        this.state={
            number:""
        }
    }
    increment=e=>{
        e.preventDefault();
        this.setState({number:parseInt(this.state.number)+1})
    }
    decrement=e=>{
        e.preventDefault();
        this.setState({number:parseInt(this.state.number)-1})
    }
    handleChange=e=>{
        e.preventDefault();
        this.setState({[e.target.name]:[e.target.value]})
    }
    render(){
        console.log(this.state.number)
        return(
            <>
            <div id="forms">
                <form>
                    <input type="number" name="number" placeholder="Enter a number" onChange={this.handleChange} value={this.state.number}/>
                </form>
            </div>
            <div id="buttons">
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
            </div>
            <Result num={this.state.number}/>
            </>
        );
    }
}

export default Buttons;