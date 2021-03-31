import React, { useState } from "react";
import { Redirect } from "react-router-dom";
function Home() {
  const [num, setNum] = useState(0);
  const increment = (e) => {
    setNum(parseInt(num) + 1);
  };
  if (num === 1) {
    return <Redirect to="/about" />;
  }
  console.log(num);
  return (
    <div id="home">
      Home Page
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Home;
