import React, {useState} from 'react';
import './Contact.css';
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import image from "../../assets/images/image1.png"
import BodyCard from "../../components/ProductCard/BodyCard";
import SectionHeading from "../../components/SectionHeading/SectionHeading.tsx";
import ProductDetail from "../ProductDetails/ProductDetails";
import SmartForm from "../../components/SmartForm/SmartForm";
import {Form} from "react-router-dom";
import {StickerForm} from "./StickerForm";
import {PortraitForm} from "./PortraitForm";
import {useAuth} from "../../context/AuthContext";




function Contact() {

    // const [isModal, setIsModal] = useState(false)
    const [selectedForm, setSelectedForm] = useState(null); // State to track the active form
    const {currentUser}=useAuth()

    function handleCardClick(formComponentName) {
        setSelectedForm(formComponentName)
    }

    const onClose = () => {
        setSelectedForm(null)
    }
    const formComponents = {
        PortraitForm: <PortraitForm currentUser={currentUser}/>,
        StickerForm: <StickerForm />,
        // formC: <FormC />,
    };

    return (
        <>
            {selectedForm &&
                <div className="modal-overlay" onClick={onClose}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <span className="modal-close" onClick={onClose}>&times;</span>

                        <SectionHeading text={"Commission request form"} align={"center"}></SectionHeading>

                            {formComponents[selectedForm] || <p>Error rendering form, Contact me instead</p>}

                        {/*<ProductDetail product={selectedProduct} productSku={selectedProduct.default_sku} onClose={onClose}/>*/}
                    </div>
                </div>
            }
            <PageHeading url={"/static/media/image2.2afdf2e7a647b3e0e510.png"} text={"Commissions"}></PageHeading>
            <BodyCard onClick={()=>handleCardClick("PortraitForm")}
                      title={"Portrait"}
                      description={"Drawing of a person"}
                      img={image}
                      buttonText={"Contact"}
                      reverse={true}
                      hover={false}>
            </BodyCard>
            <BodyCard onClick={()=>handleCardClick("StickerForm")}
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
