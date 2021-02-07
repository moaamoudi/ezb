
import * as reactBootstrap from "react-bootstrap";
import React from 'react';
 
class NavBar extends React.Component {
  render() {
    return (
        <reactBootstrap.Navbar  bg="dark" variant="dark">
        <reactBootstrap.Navbar.Brand href="/">
          <img
            alt=""
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnTMfZRQE7RrGil2r_EdAteKZjdPlygVGOwg&usqp=CAU"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          EZB
        </reactBootstrap.Navbar.Brand>
      </reactBootstrap.Navbar >   
    );
  }
}
 
export default NavBar;