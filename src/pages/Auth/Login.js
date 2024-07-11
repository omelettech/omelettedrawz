import React, {useContext, useState} from 'react';
import './Login.css';
import {useNavigate} from 'react-router-dom'
import {auth} from '../../config/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {AuthContext} from '../../context/AuthContext';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate(); // Initialize useHistory


    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/home')
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="signin-container">
            <h2 className="signin-title">Sign In</h2>
            {currentUser && <p>Welcome back, {currentUser.email}</p>}
            {error && <p className="signin-error">{error}</p>}
            <form className="signin-form" onSubmit={handleSignIn}>
                <input
                    type="email"
                    placeholder="Email"
                    className="signin-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="signin-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="signin-button">Sign In</button>
            </form>
        </div>
    );
}

export default SignIn;
