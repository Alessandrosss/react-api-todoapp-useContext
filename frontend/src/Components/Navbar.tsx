import React, { useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { MenuItem, Menu, Button } from "semantic-ui-react";
import { AppContext } from "../App";

interface Props {
  title: string;
  path: string;
}

const NavbarItem = (props: Props) => {
  //localize actual location and set it to active
  const location = useLocation();
  const isActive = location.pathname === props.path;

  //on click navigate to the Path
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(props.path);
  };

  // hide login and register buttons if logged in
  const { isLIn } = useContext(AppContext);
  if (isLIn && (props.path === "/login" || props.path === "/register"))
    return null;

  return (
    <MenuItem active={isActive} onClick={handleClick}>
      {props.title}
    </MenuItem>
  );
};

const Navbar = () => {
  const { isLIn, setIsLIn, token, setToken } = useContext(AppContext);

  const navigate = useNavigate();

  function handleLogout() {
    setIsLIn(false);
    setToken("");
    navigate("/login");
  }

  return (
    <Menu pointing secondary>
      <NavbarItem title="Home" path="/" />
      <NavbarItem title="About" path="/about" />
      <Menu.Menu position="right">
        {isLIn && <NavbarItem title="Dashboard" path="/dashboard" />}
        {isLIn && (
          <Button onClick={handleLogout} basic>
            Logout
          </Button>
        )}
        <NavbarItem title="Login" path="/login" />
        <NavbarItem title="Register" path="/register" />
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
