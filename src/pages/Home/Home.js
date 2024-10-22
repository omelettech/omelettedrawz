import React, {useContext} from 'react';
import speech_bubble from "../../components/Speech_bubble/speech_bubble";
import {AuthContext} from "../../context/AuthContext";
import bg from '../../assets/images/image1.png'
import red_guy from '../../assets/images/red guy2.png'
import {useNavigate} from 'react-router-dom'

import SectionHeading from "../../components/SectionHeading/SectionHeading.tsx";
import "./Home.css"
import BodyCard from "../../components/ProductCard/BodyCard";


const Home = () => {
    const navigate = useNavigate(); // Initialize useHistory

    const {currentUser} = useContext(AuthContext)
    console.log(currentUser)
    return (
        <>
            {!currentUser &&
                <div className="hero-section">
                    <div className="hero-content">
                        <h1>GIVE YOUR PERSONAL SPACE LIFE</h1>
                        <h3>With stickers, postcards, canvas prints, and more.</h3>
                        <div className="hero-buttons">
                            <button className="btn primary" onClick={()=>navigate('/shop')}>Shop</button>
                            <button className="btn secondary">Custom</button>
                        </div>
                    </div>
                </div>
            }
            <SectionHeading text={"Featured"} align={"center"}/>
            <BodyCard img={red_guy} title={"Disassociate"} buttonText={"Check out more"} description={
                "I often find myself lost in the absurdness of reality, With the color scheme of Green and red" +
                " I tried to make it melodramatic."
            } onClick={() => navigate("/gallery")}
            ></BodyCard>


        </>
    )
};

export default Home;
