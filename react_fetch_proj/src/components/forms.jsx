import React from "react";
import "./forms.css";
import Result from "./result";

class Forms extends React.Component{
    constructor(props){
        super(props);
        this.state={
            country:"",
            result:[]
        }
    }
    //handleChange Function
    handleChange=e=>{
        e.preventDefault();
        this.setState({[e.target.name]:[e.target.value]});
    }
    submit=e=>{
        e.preventDefault();
        //fetch
        fetch("https://coronavirus-19-api.herokuapp.com/countries/"+this.state.country)
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            console.log(data);
            this.setState({result:[data]});
        })
        .catch(err=>{
            console.log(err);
        })
    }
    render(){
        console.log("result=",this.state.result)
        const resultjsx=this.state.result.map((item)=><Result active={item.active} cases={item.cases}/>);
        return(
            <>
            <div id="forms">
                <form>
                    <input type="text" placeholder="Enter a Country Name" name="country" value={this.state.country} onChange={this.handleChange} />
                    <button onClick={this.submit}>Search Covid Info</button>
                </form>
            </div>
            {resultjsx}
            </>
        )
    }
}

export default Forms;