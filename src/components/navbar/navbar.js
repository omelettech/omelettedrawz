import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {auth} from "../../config/firebase";
import {AuthContext} from "../../context/AuthContext";
import './navbar.css';
import logo from '../../assets/images/logo.png';
import logoHover from '../../assets/images/logo-hover.png';
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher"; // Your second image

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
                <div className="navbar-menu-container">
                    <ul className="navbar-menu">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/gallery">Gallery</Link></li>
                        <li><Link to="/Contact">Commissions</Link></li>

                    </ul>
                </div>

                <div className="dropdown" style={
                    {
                        background: isOpen ? "#fff" : "rgba(0,0,0,0)",
                        transition: "all 0.5s ease",
                        boxShadow: "0 0 0 #fff"
                    }}>

                    <div className={"dropdown-avatar-container"}>
                        <div className="dropdown-avatar" onClick={toggleDropdown}
                             style={{
                                 width: isOpen ? "100%" : "40px",
                                 borderRadius: isOpen ? "10px" : "50%",
                                 border: !isOpen?"#ffffff 3px solid":"#fff 0 solid",


                             }}
                        >
                            <img
                                alt="Profile"
                                src="https://picsum.photos/200/300?grayscale"
                            />
                        </div>

                    </div>

                    {/* Dropdown Menu */}


                    <div className={"dropdown-menu-container"}
                         style={{
                             visibility: !isOpen ? "hidden" : "visible",
                             opacity: !isOpen ? "0" : "1",
                             height: !isOpen ? "0" : "300px"
                         }}>
                        <div className={"dropdown-menu "}>


                            <ThemeSwitcher/>
                            <hr/>
                            {isOpen && <ul className={"dropdown-list"}>
                                <li><Link to="/about">About me</Link></li>

                                <li><Link to="/contact">Contact</Link></li>
                                <li>
                                    <hr/>
                                </li>
                                <li><Link to="/contact">Profile</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                                <li onClick={handleLogout}><Link to={"/"}>Logout</Link></li>
                            </ul>}
                        </div>
                    </div>


                </div>

            </div>
        )
            ;
    }
;

export default Navbar;
