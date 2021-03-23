import React, { useState } from "react";
import "./form.css";
import Result from "./result";
function Form() {
  const [country, setCountry] = useState("");
  const [res, setRes] = useState([]);
  const submit = (e) => {
    e.preventDefault();

    //api url
    const apiURL =
      "https://coronavirus-19-api.herokuapp.com/countries/" + country;

    //fetch api url
    fetch(apiURL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRes([data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const resultjsx = res.map((item) => (
    <Result active={item.active} cases={item.cases} />
  ));
  return (
    <>
      <div id="form">
        <form>
          <input
            type="text"
            placeholder="country name"
            name="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
          <button onClick={submit}>Search Covid Details</button>
        </form>
      </div>
      {resultjsx}
    </>
  );
}

export default Form;
