import React, {useState} from 'react';
import './Register.css';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword,getAuth } from 'firebase/auth';
import {Link} from "react-router-dom";

function Register() {
    const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [username, setUsername] = useState('');
      const [error, setError] = useState('');
      const auth = getAuth()
    const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("SUCCESS")
    } catch (err) {
      setError(err.message);
    }
  };

  return (
      <div className="register-container">
          <h2 className="register-title">Register</h2>
          {error && <p className="register-error">{error}</p>}
          <form className="register-form" onSubmit={handleRegistration}>
              <input
                  type="text"
                  placeholder="Username"
                  className="register-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
              <input
                  type="email"
                  placeholder="Email"
                  className="register-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
              <input
                  type="password"
                  placeholder="Password"
                  className="register-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="register-button">Sign Up</button>
          </form>
          <div className='signupContainer__box__login'>
              <p>
                  Already have an account? <Link to='/signin'>Sign In</Link>
              </p>
          </div>
      </div>
  );
}

export default Register;
