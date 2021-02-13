import { React, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default function PrivateRoute({ component: Component, ...rest }) {
  const [collapsed, setCollapsed] = useState(false);

  const [toggled, setToggled] = useState(false);
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
            ></NavBar>

            <div className="app">
              <SideBar
                collapsed={collapsed}
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
              />
              {/* <Main
        
        toggled={toggled}
        collapsed={collapsed}
        
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        
        
      /> */}
              <Component {...props} />
            </div>
          </>
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
