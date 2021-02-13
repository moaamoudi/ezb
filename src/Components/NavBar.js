import * as reactBootstrap from "react-bootstrap";
import React from "react";
import "./styles/NavBar.css";
import logo from "../imgs/logo.png";


const NavBar = ({
  collapsed,
  rtl,
  image,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
}) => {
  return (
    <reactBootstrap.Navbar
      variant="light"
      className="bg-color"
      style={{ height: "6vh" }}
    >
      
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-list btn-toggle"
          viewBox="0 0 16 16"
          onClick={handleCollapsedChange} 
        >
          <path
            fillRule="evenodd"
            d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      

      <reactBootstrap.Navbar.Brand href="/">
        <img
          alt=""
          src={logo}
          width="100vh"
          height="100%"
          className="d-inline-block align-top ml-3"
        />
      </reactBootstrap.Navbar.Brand>
    </reactBootstrap.Navbar>
  );
};

export default NavBar;
