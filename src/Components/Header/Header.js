import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header_container">
      <div className="company_logo">
        <h1>BookStore</h1>
      </div>
      <div className="search_bar">
        <input placeholder="Search"></input>
      </div>
      <div className="navlinks">
        <h3>Home</h3>
        <h3>About</h3>
        <h3>Categories</h3>
      </div>
    </div>
  );
};

export default Header;
