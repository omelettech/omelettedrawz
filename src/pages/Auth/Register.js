import React from 'react';
import './Register.css';

function Register() {
  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form">
        <input type="text" placeholder="Username" className="register-input" />
        <input type="email" placeholder="Email" className="register-input" />
        <input type="password" placeholder="Password" className="register-input" />
        <button type="submit" className="register-button">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
