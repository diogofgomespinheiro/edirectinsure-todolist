//Library imports
import React from "react";
import { Link } from "react-router-dom";

//Style imports
import "./styles.scss";

const Header = () => {
  return (
    <div className="header">
      <h1 className="title">EDirectInsure TODO List</h1>
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
