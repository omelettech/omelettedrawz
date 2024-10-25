import React, {useState} from 'react';
import './Register.css';
import {auth} from '../../config/firebase';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {Link, useNavigate} from "react-router-dom";
import g_logo from "../../assets/images/google_logo.png";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
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
    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
        }}>
            <div className="form-container">
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
                <br/>
                <hr/>
                <br/>
                <p align={'center'}>Or Sign up with</p>

                <div style={{display: 'flex', flexDirection: "row", justifyContent: 'center'}}>
                    <button onClick={handleGoogleLogin} className={"badge"}><img
                        src={g_logo}
                        alt="Google logo"
                        style={{width: '25px'}}
                    /></button>
                </div>
                <div className='signupContainer__box__login'>
                    <p>
                        Already have an account? <Link to='/login'>Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
