import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext, useAuth} from "../../context/AuthContext";
import './navbar.css';
import logo from '../../assets/images/logo.png';
import logoHover from '../../assets/images/logo-hover.png';
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import axios from "axios";
import {BASE_URL, getCSRFToken} from "../../services/apiClient"; // Your second image

const Navbar = () => {
        const {currentUser,token} = useAuth();
        const [isOpen, setIsOpen] = useState(false);
        const navigate = useNavigate()
        const {logout} = useAuth()
        const toggleDropdown = () => {
            console.log(currentUser)
            setIsOpen(!isOpen);
        };

        //TODO: Temporary
        const displayUserProperties=()=>{
            console.log(
                `User profile: ${currentUser}\n Token: ${token}`)
        }

        const handleLogout = async () => {
            try {
                await logout()
            }catch (e){
                console.error("Error logging out. just log back in")
                navigate("/login")
            }

            // try{
            //     console.log("trying logout",token)
            //     const response =await axios.post(BASE_URL+"users/v1/dj-rest-auth/logout/",{
            //         headers: {
            //             'Authorization': `Bearer ${token}`,
            //             'Content-Type': 'application/json',
            //
            //         }}
            //     )
            //     if (response.status>200 && response.status<=300){
            //         console.log("success")
            //     }
            //
            //     console.log(response)
            // }catch (e){
            //     console.error(e)
            // }

        };

        function handleLogin() {
            setIsOpen(false)
        }

    let avatarStroke = "#ffffff";

    return (
            <div className={`navbar dark`}>
                {console.log("Username:",JSON.stringify(currentUser),"token",token)}
                {currentUser && <div>{currentUser.username}</div>}
                <div className="navbar-start" onClick={()=>navigate("/")}>
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
                        background: isOpen ? "var(--dropdown-bg)" : "var(--dropdon-bg)",
                        transition: "all 0.5s ease",
                        boxShadow: "0 0 0 #fff"
                    }}>

                    <div className={"dropdown-avatar-container"}>
                        <div className="dropdown-avatar" onClick={toggleDropdown}
                             style={{
                                 width: isOpen ? "100%" : "40px",
                                 borderRadius: isOpen ? "10px" : "50%",
                                 border: !isOpen ? avatarStroke + " 3px solid" : "#fff 0 solid",


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
                                <li><Link to="/links">Socials</Link></li>

                                <li>
                                    <hr/>
                                </li>
                                {currentUser && <li><Link to="/contact">Profile</Link></li>}
                                <li><Link to="/contact">Contact</Link></li>

                                <li>
                                    <button onClick={displayUserProperties}></button>
                                </li>

                                {currentUser ?
                                    <li onClick={handleLogout}><Link to={"/"}>Logout</Link></li>
                                    : <li onClick={handleLogin}><Link to={"/login"}>Login</Link></li>}
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
