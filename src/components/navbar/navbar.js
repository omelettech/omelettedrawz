import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {auth} from "../../config/firebase";
import {AuthContext} from "../../context/AuthContext";
import ThemeSwitcher from '../ThemeSwitcher';
import './navbar.css';

const Navbar = ({theme }) => {
    const {currentUser} = useContext(AuthContext);
    const navigate= useNavigate()
    const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/")
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
      <div className={`navbar ${theme}`}>
      <div className="navbar-start">
        <a className="navbar-brand" href="/">
          Brand
        </a>
      </div>
      <div className="navbar-end">
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/contact">Contact</Link></li>
            <ThemeSwitcher />
        </ul>
      </div>


      <div className="dropdown">
        <div className="dropdown-avatar">
          <img
            alt="Profile"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />

        </div>

      </div>
    </div>
  );
};

export default Navbar;
