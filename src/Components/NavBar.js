import * as reactBootstrap from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { Dropdown } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import "./styles/NavBar.css";
import logo from "../imgs/ezb3.png";
import { set } from "date-fns";

function NavBar(props) {
  // collapsed,
  // rtl,
  // image,
  // handleToggleSidebar,

  const handleCollapsedChange = props.handleCollapsedChange;
  const {
    currentUser,
    userDetails,
    companiesData,
    selectCompany,
    setCompanyChanged,
    setSelectedCompany,
    userNotifications,
    setUserNotificationsRead,
    logout,
  } = useAuth();

  function countNotification() {
    let count = 0;
    userNotifications.forEach((not) => {
      if (not.read === false) {
        count++;
      }
    });
    return count;
  }

  function readNotifications() {
    let items = [];
    userNotifications.forEach((not) => {
      not.read = true;
      items.push(not);
    });
    setUserNotificationsRead(items);
  }

  function handleLogout() {
    logout();
  }

  const history = useHistory();

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
          width="100vh"
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
          {selectCompany.companyName.length>0?selectCompany.companyName:"<<Loading>>"}
          {companiesData.length > 1 ? (
            <div className="dropDown">
              <reactBootstrap.Dropdown
                alignRight={true}
                variant="menu"
                id="dropdown-menu-align-right"
                title=""
              >
                <reactBootstrap.Dropdown.Toggle
                  split
                  variant="menu ml-2"
                  id="dropdown-custom-2"
                />

                <reactBootstrap.Dropdown.Menu>
                  {companiesData.map((company) => (
                    <div key={company.companyName}>
                      <reactBootstrap.Dropdown.Item
                        as="button"
                        onSelect={() => {
                          localStorage.removeItem("selectedProject")
                          localStorage.removeItem("selectedProjectNotes")
                          localStorage.removeItem("selectedProjectTasks")
                          setSelectedCompany(company);
                          history.push("/");
                        }}
                      >
                        {company.companyName.length>0?company.companyName:"<<Loading>>"}
                      </reactBootstrap.Dropdown.Item>
                      <hr style={{ width: "100%", margin: "0" }} />
                    </div>
                  ))}
                </reactBootstrap.Dropdown.Menu>
              </reactBootstrap.Dropdown>
            </div>
          ) : (
            <></>
          )}
        </h2>
      </div>
      <reactBootstrap.Dropdown
        style={{ marginRight: "10px", marginLeft: "auto",marginTop:"6px" }}
        drop="left"
      >
        <reactBootstrap.Dropdown.Toggle
          variant="transperant"
          style={{ fontSize: "0px" }}
          id="dropdown-basic"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fillRule="currentColor"
            className="bi bi-bell"
            viewBox="0 0 16 16"
            onClick={() => readNotifications()}
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
          </svg>
          <div>
            {countNotification() > 0 ? (
              <h6
                style={{
                  background: "red",
                  position: "absolute",
                  top: "0",
                  right: "0",
                  borderRadius: "50%",
                  padding: "2px",
                  color: "white",
                  width: "20px",
                  height: "20px",
                }}
              >
                {countNotification()}
              </h6>
            ) : (
              <h6 />
            )}
          </div>
        </reactBootstrap.Dropdown.Toggle>

        <reactBootstrap.Dropdown.Menu>
          {userNotifications.map((noti) => (
            <div key={noti.id}>
              <reactBootstrap.Dropdown.Item as="button">
                <div>
                  <h6>{noti.message}</h6>
                </div>
              </reactBootstrap.Dropdown.Item>
            </div>
          ))}
        </reactBootstrap.Dropdown.Menu>
      </reactBootstrap.Dropdown>

      <div style={{ marginRight: "-10px" }}>
        <reactBootstrap.Dropdown
          style={{ marginRight: "32px", marginLeft: "auto" }}
          drop="left"
        >
          <reactBootstrap.Dropdown.Toggle
            variant="transperant"
            style={{ fontSize: "0px" }}
            id="dropdown-basic"
          >
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
          </reactBootstrap.Dropdown.Toggle>
          <reactBootstrap.Dropdown.Menu>
            <div>
              <reactBootstrap.Dropdown.Item as="button">
                <h6>Details</h6>
              </reactBootstrap.Dropdown.Item>
              <reactBootstrap.Dropdown.Item
                as="button"
                onClick={() => handleLogout()}
              >
                <h6>Logout</h6>
              </reactBootstrap.Dropdown.Item>
            </div>
          </reactBootstrap.Dropdown.Menu>
        </reactBootstrap.Dropdown>
      </div>
    </reactBootstrap.Navbar>
  );
}

export default NavBar;
