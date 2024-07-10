import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './navbar.css';
import {AuthContext} from "../../context/AuthContext";

import {auth} from '../../config/firebase'

const Navbar = () => {
    const navigate=useNavigate()
    const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
    const currentUser = useContext(AuthContext)
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Logo</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/register">Register</Link></li>
                {currentUser && <li>{currentUser.email}</li>}
                {currentUser && <li><btn onClick={handleLogout}>Logout</btn></li>}

            </ul>
        </nav>
    );
};

export default Navbar;
