import React, {useState} from 'react';
import './Register.css';
import {auth} from '../../config/firebase';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {Link, useNavigate} from "react-router-dom";
import g_logo from "../../assets/images/google_logo.png";
import {useAuth} from "../../context/AuthContext";

function Register() {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('')
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {register}=useAuth()
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
    const validateForm = () => {
        if(email==="" || password1==="" || password2==="" || username===""){
            setError("All fields are required")
            return true
        }
        if(password1 !== password2){
            setError("Passwords do not match")
            return true
        }
        if(password1.length < 8){
            setError("Password must be at least 8 characters")
            return true
        }
        return false

    };
    const handleRegistration = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if(validationError){
            return
        }try {
            await register(username,email, password1,password2);
            // navigate("/login")

        } catch (err) {
            console.log("asdasd")
            if(err.responseText) {
                setError(err.responseText);
            }else {
                // Other errors (e.g., network issues, bad setup)
                console.error("Error:", err.message);
                setError("An unexpected error occurred.");
            }
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
                <form className="register-form" onSubmit={handleRegistration}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="username">Email</label>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="username">Password</label>

                    <input
                        type="password"
                        placeholder="Password"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}

                    />
                    <input
                        type="password"
                        placeholder="Re-enter Password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    {error && <p className="register-error">{error}</p>}

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
