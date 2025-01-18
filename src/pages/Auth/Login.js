import React, {useContext, useState} from 'react';
import './Login.css';
import {Link, useNavigate} from 'react-router-dom'
import {auth} from '../../config/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {AuthContext, useAuth} from '../../context/AuthContext';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import g_logo from "../../assets/images/google_logo.png"
import axios from "axios";
import {login} from "../../services/apiClient";

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {updateToken,updateCurrentUser} = useAuth()
    const navigate = useNavigate(); // Initialize useHistory


    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email,password)
            if (response)
            {
                updateToken(response.access)
                updateCurrentUser(response.user)
            }
        } catch (err) {
            setError(err.message);
        }
    };
    const handleGoogleLogin = async (e) => {
        try {
            let provider = await new GoogleAuthProvider();
            signInWithPopup(auth, provider).then(
                () => navigate('/')
            ).catch(
                (e) => setError(e)
            )
        } catch (e) {
            console.error(e)
        }

    }

    return (
        <div style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
        }}>
            <div className="form-container">
                <h2 className="signin-title">Sign In</h2>
                {error && <p className="signin-error">{error}</p>}
                <form className="signin-form" onSubmit={handleSignIn}>
                    <input
                        type="text"
                        placeholder="Username"
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
                <br/>
                <hr/>
                <p align={'center'}>Or log in with</p>
                <div style={{display: 'flex', flexDirection: "row", justifyContent: 'center'}}>
                    <button onClick={handleGoogleLogin} className={"badge"}><img
                        src={g_logo}
                        alt="Google logo"
                        style={{width: '25px'}}
                    /></button>
                </div>
                <p>
                    Don't an account? <Link to='/register'>Register</Link>
                </p>
            </div>
        </div>
    );
}

export default SignIn;
