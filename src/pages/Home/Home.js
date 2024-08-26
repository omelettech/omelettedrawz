import React, {useContext} from 'react';
import speech_bubble from "../../components/Speech_bubble/speech_bubble";
import {AuthContext} from "../../context/AuthContext";
import bg from '../../assets/images/image1.png'
import SectionHeading from "../../components/SectionHeading/SectionHeading.tsx";
import "./Home.css"
import ProductCard from "../../components/ProductCard/ProductCard";

const Home = () => {
    const {currentUser} = useContext(AuthContext)

    return (
        <>
            {!currentUser &&
                <div className="hero-section">
                    <div className="hero-content">
                        <h1>GIVE YOUR PERSONAL SPACE LIFE</h1>
                        <h3>With stickers, postcards, canvas prints, and more.</h3>
                        <div className="hero-buttons">
                            <button className="btn primary">Shop</button>
                            <button className="btn secondary">Custom</button>
                        </div>
                    </div>
                </div>
            }
            <SectionHeading text={"New arrivals"} align={"center"}/>
            <ProductCard img={bg} title={"You look lonely"} buttonText={"Buy"}></ProductCard>

                

        </>
                )
            };

            export default Home;
