import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {auth} from "../../config/firebase";
import {AuthContext} from "../../context/AuthContext";
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import './navbar.css';
import logo from '../../assets/images/logo.png';
import logoHover from '../../assets/images/logo-hover.png'; // Your second image

const Navbar = () => {
    const {currentUser} = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const toggleDropdown = () => {
            setIsOpen(!isOpen);
        };
    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate("/")
        } catch (error) {
            console.error('Error logging out:', error);
        }

    };
    return (
        <div className={`navbar dark`}>
            <div className="navbar-start">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo"/>
                    <div className="hover-image-container">
                        <img src={logoHover} alt="Hover Logo" className="hover-image"/>
                    </div>
                </div>
            </div>
            <div className="navbar-end">
                <ul className="navbar-menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/gallery">Gallery</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>


            <div className="dropdown">


                <div className="dropdown-avatar" onClick={toggleDropdown}>
                    <img
                        alt="Profile"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />

                </div>
                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="dropdown-menu">
                        <ThemeSwitcher/>
                        <hr/>
                        {/* Add more dropdown items here */}
                        <a href="#">Profile</a>
                        <a href="#">Settings</a>
                        <a href="#">Logout</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
