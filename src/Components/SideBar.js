import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import "./SideBar.scss";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <ProSidebar>
      <Menu iconShape="square">
        <MenuItem>
          Home <Link to="/" />
        </MenuItem>
        <MenuItem>
          Calender <Link to="/calender" />
        </MenuItem>
        <MenuItem>
          Clients <Link to="/clients" />
        </MenuItem>
        <MenuItem>
          Contracts <Link to="/contracts" />
        </MenuItem>
      </Menu>
    </ProSidebar>
  );
}
export default SideBar;
