import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PowerPickemsLogo from '../assets/images/powerpicks_logo.png';

const Header = () => {
  return (
    <header className="header">
        <div className="logo">
            <Link to="/">
                <img src={PowerPickemsLogo} alt="" />
            </Link>
        </div>
        <ul>
          <li>
            <Link to="/login">
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li>
            <Link to="/register">
              <FaUser /> Register
            </Link>
          </li>
        </ul>
    </header>
  )
}

export default Header