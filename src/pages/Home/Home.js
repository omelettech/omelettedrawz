import React, {useContext} from 'react';
import speech_bubble from "../../components/Speech_bubble/speech_bubble";
import {AuthContext} from "../../context/AuthContext";
import bg from '../../assets/images/image1.png'

const Home = () => {
    const {currentUser} = useContext(AuthContext)
    if (currentUser) {
        return (
            <div className="hero-container">
                <div className="hero-content">
                    <h1>Welcome to Our Website</h1>
                    <p>Your journey to excellence starts here.</p>
                    <button className="hero-button">Get Started</button>
                </div>
            </div>
        );
    } else {
        return (
            <div>log in</div>
        )
    }
};

export default Home;
