import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="signin-container">
      <h2 className="signin-title">Sign In</h2>
      <form className="signin-form">
        <input type="email" placeholder="Email" className="signin-input" />
        <input type="password" placeholder="Password" className="signin-input" />
        <button type="submit" className="signin-button">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
