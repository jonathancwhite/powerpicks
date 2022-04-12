import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";
import { Tooltip } from "@mui/material";
import { useDispatch } from 'react-redux';
import { Menu, IconButton, MenuItem, Typography } from "@mui/material";

import PowerPicksTextLogo from "../../assets/images/powerpicks_logo.png";

const settings = ["Profile", "Account", "Dashboard"];
const pages = ["Current Leagues", "Past Champions"];

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const [click, setClick] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    handleCloseUserMenu();
    dispatch({ type: 'LOGOUT' });
    history.push('/leagues');
  }


  useEffect(() => {
    const token = user?.token;
    // JWT

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
    <>
      <nav className="navbar">
        <div className="navbar__logo">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src={PowerPicksTextLogo} alt="" />
          </Link>
        </div>
        <div className="navbar__menu">
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {pages.map((page) => (
              <li className="nav-item" key={page}>
                <Link
                  to={page}
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar__account">
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar src="/broken-image.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
            <MenuItem onClick={logout}>
              <Typography textAlign="center">Log out</Typography>
            </MenuItem>
          </Menu>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
