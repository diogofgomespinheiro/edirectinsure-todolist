//Library imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { logout } from "../../store/modules/auth/actions";

//Style imports
import "./styles.scss";

const Header = () => {
  const [dropdown, toggleDropdown] = useState(false);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);

  const dispatch = useDispatch();

  const onLogout = () => dispatch(logout());

  const handleLogout = () => {
    toggleDropdown(false);
    onLogout();
  };

  const links = token ? (
    <div
      style={{ position: "relative" }}
      onMouseLeave={() => toggleDropdown(false)}
    >
      <li onMouseEnter={() => toggleDropdown(true)}>{user?.name}</li>
      {dropdown && (
        <div className="dropdown">
          <p onClick={handleLogout}>Logout</p>
        </div>
      )}
    </div>
  ) : (
    <>
      {" "}
      <li>
        <Link to="/">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </>
  );

  return (
    <div className="header">
      <h1 className="title">EDirectInsure TODO List</h1>
      <ul>{links}</ul>
    </div>
  );
};

export default Header;
