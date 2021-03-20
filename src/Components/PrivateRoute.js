import { React, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import "./styles/SideBar.scss";
export default function PrivateRouteLayout({ component: Component, ...rest }) {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const { companyName } = useAuth();
  const { currentUser } = useAuth();

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <>
            <NavBar
              toggled={toggled}
              collapsed={collapsed}
              handleToggleSidebar={handleToggleSidebar}
              handleCollapsedChange={handleCollapsedChange}
              companyName={companyName + ""}
            ></NavBar>

            <div className="app">
              <div>
                <SideBar
                  collapsed={collapsed}
                  toggled={toggled}
                  handleToggleSidebar={handleToggleSidebar}
                />
              </div>
              <div style={{ overflow: "auto", width: "100%" }}>
                <Component {...props} />
              </div>
            </div>
          </>
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
