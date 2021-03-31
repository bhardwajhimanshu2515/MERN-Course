import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div id="header">
      <div id="logo">React Routing Project</div>
      <div id="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
    </div>
  );
}

export default Header;
