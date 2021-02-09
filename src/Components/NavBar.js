
import * as reactBootstrap from "react-bootstrap";
import React from 'react';
import './NavBar.css'
import logo from '../imgs/logo.png'
 
class NavBar extends React.Component {
  render() {
    return (
        <reactBootstrap.Navbar variant="light" className="bg-color">
        <reactBootstrap.Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="100vh"
            height="100%"
            className="d-inline-block align-top"
          />
         
        </reactBootstrap.Navbar.Brand>
      </reactBootstrap.Navbar >   
    );
  }
}
 
export default NavBar;