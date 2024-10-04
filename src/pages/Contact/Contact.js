import React from 'react';
import './Contact.css';
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import image from "../../assets/images/image1.png"
import BodyCard from "../../components/ProductCard/BodyCard";
import SectionHeading from "../../components/SectionHeading/SectionHeading.tsx";
function Contact() {
    function handleCardClick() {
        return undefined;
    }

    return (
        <>
            <PageHeading url={"/static/media/image2.2afdf2e7a647b3e0e510.png"} text={"Commissions"}></PageHeading>
            <BodyCard onClick={handleCardClick()}
                      title={"Portrait"}
                      description={"Drawing of a person"}
                      img={image}
                      buttonText={"Contact"}
                      reverse={true}
                      hover={false}>
            </BodyCard>
            <BodyCard onClick={handleCardClick()}
                      title={"Custom stickers"}
                      description={"Have me design you a sticker and ship it"}
                      img={image} buttonText={"Contact"}
                      hover={false}>

            </BodyCard>
            <SectionHeading text={"Other stuff"} align={"center"}></SectionHeading>
            <div className="contact-container">

                <h2 className="contact-title">Contact Me</h2>
                <form className="contact-form">
                    <input type="text" placeholder="Name" className="contact-input"/>
                    <input type="email" placeholder="Email" className="contact-input"/>
                    <textarea placeholder="Message" className="contact-textarea"></textarea>
                    <button type="submit" className="contact-button">Send</button>
                </form>
            </div>
        </>

    );
}

export default Contact;
