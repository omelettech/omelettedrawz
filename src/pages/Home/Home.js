import React, {useContext} from 'react';
import speech_bubble from "../../components/Speech_bubble/speech_bubble";
import './Home.css';
import {AuthContext} from "../../context/AuthContext";

const Home = () => {
    return (
        <div className="home">
            <div className="hero-section">
                <div className="hero-image"></div>
                <div className="hero-content">
                    <speech_bubble text="Welcome to our site!" />
                    <div className="hero-box">
                        <h2>Our Services</h2>
                        <div className="hero-images">
                            <img src="" alt="Service 1" />
                            <img src="" alt="Service 2" />
                            <img src="" alt="Service 3" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
