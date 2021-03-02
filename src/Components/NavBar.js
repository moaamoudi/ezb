import * as reactBootstrap from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { Dropdown } from "semantic-ui-react";
import "./styles/NavBar.css";
import logo from "../imgs/logo.png";
import { set } from "date-fns";

function NavBar(props) {
  // collapsed,
  // rtl,
  // image,
  // handleToggleSidebar,
  
  const handleCollapsedChange = props.handleCollapsedChange;
  const { currentUser, userDetails,companiesData ,selectCompany,setSelectCompany} = useAuth();
  useEffect(() => {
    setSelectCompany(companiesData[0])
  }, [companiesData])
  


  return (
    <reactBootstrap.Navbar
      variant="light"
      className="bg-color text-center"
      style={{
        height: "6vh",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        className="bi bi-list btn-toggle"
        viewBox="0 0 16 16"
        style={{
          justifyContent: "center",
          justifyItems: "center",
        }}
        onClick={handleCollapsedChange}
      >
        <path
          fillRule="evenodd"
          d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>

      <reactBootstrap.Navbar.Brand
        href="/"
        style={{
          justifyContent: "center",
          justifyItems: "center",
          marginRight: "auto",
        }}
      >
        <img
          alt=""
          src={logo}
          width="110vh"
          height="100%"
          className="d-inline-block align-top ml-3"
        />
      </reactBootstrap.Navbar.Brand>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <h2 style={{ display: "flex" }}>
          {selectCompany.companyName}
          {companiesData.length>1?(<div className="dropDown"><reactBootstrap.Dropdown 
            menuAlign="right"
            variant="menu"
            id="dropdown-menu-align-right"
            title=""
          >
             <reactBootstrap.Dropdown.Toggle split variant="menu ml-2" id="dropdown-custom-2" />

            <reactBootstrap.Dropdown.Menu className="super-colors">
            {companiesData.map((company) => (
              <div>
                
              <reactBootstrap.Dropdown.Item eventKey={company}  as="button" onSelect={()=>{setSelectCompany(company)}}>
                {company.companyName}
              </reactBootstrap.Dropdown.Item>
              <hr style={{width:"100%", margin:"0"}}/></div>
            ))}
            </reactBootstrap.Dropdown.Menu>
          </reactBootstrap.Dropdown ></div>):(<></>)}
          
        </h2>
        
      </div>

      <div style={{ marginRight: "1rem", marginLeft: "auto" }}>
        {currentUser.photoURL ? (
          <img
            style={{ borderRadius: "50%", width: "35px" }}
            src={currentUser.photoURL}
            alt="Profile_Picture"
          ></img>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        )}
      </div>
    </reactBootstrap.Navbar>
  );
}

export default NavBar;
