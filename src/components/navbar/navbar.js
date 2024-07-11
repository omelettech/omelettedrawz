import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import 'tailwindcss/tailwind.css';
import {auth} from "../../config/firebase";
import {AuthContext} from "../../context/AuthContext";

const Navbar = () => {
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
      <div className="navbar bg-base-100 shadow-lg">
          <div className="navbar-start">
              <a className="btn btn-ghost normal-case text-xl" href="/">
                  Brand
              </a>
          </div>
          <div className="navbar-end lg:flex">
              <ul className="menu menu-horizontal px-1">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/shop">Shop</Link></li>
                  <li><Link to="/gallery">Gallery</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
              </ul>
          </div>
          <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                      <img
                          alt="Tailwind CSS Navbar component"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                  </div>
              </div>
              <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li>
                      <a className="justify-between">
                          Profile
                          <span className="badge">New</span>
                      </a>
                  </li>
                  <li><a>Settings</a></li>
                  <li><a onClick={handleLogout}>Logout</a></li>
              </ul>
          </div>
      </div>
  );
};

export default Navbar;
