import React from "react";
import { Link } from "react-router-dom";
import 'tailwindcss/tailwind.css';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          Brand
        </a>
      </div>
      <div className="navbar-center lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link to="/signin" className="btn btn-primary">Sign In</Link>
      </div>
    </div>
  );
};

export default Navbar;
