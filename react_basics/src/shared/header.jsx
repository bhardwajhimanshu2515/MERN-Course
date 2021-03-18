import React from "react";
import "./Header.css";
class Header extends React.Component {
  render() {
    return (
      <div id="header">
        <div id="logo">Himanshu</div>
        <div id="links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </div>
    );
  }
}

export default Header;
