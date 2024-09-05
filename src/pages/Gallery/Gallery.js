import React, {useEffect, useState} from 'react';
import './Gallery.css';
import Layout from 'react-masonry-list';

import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/image3.png";
import image4 from "../../assets/images/image4.png";
import image5 from "../../assets/images/image5.png";
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";


const images = [
    {src: image1, width: 4000, height: 4000, alt: "alt"},
    {src: image2, width: 2362, height: 3496, alt: "alt"},
    {src: image3, width: 4000, height: 4000, alt: "alt"},
    {src: image4, width: 3600, height: 4800, alt: "alt"},
    {src: image5, width: 3000, height: 3750, alt: "alt"},
]

const minImgWidth = 600
const calculateHeight = (w, h) => {
    return w <= minImgWidth ? h : Math.round((h / (w / minImgWidth)) * 100) / 100
}


const Gallery = () => {
    const [layout, setLayout] = useState([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);


    useEffect(() => {
        const layoutData = images.map((img) => {


            return {
                ...img,
                width: img.width < minImgWidth ? img.width : minImgWidth,
                height: calculateHeight(img.width, img.height)
            };
        });

        setLayout(layoutData);
    }, []);
    console.log(layout)
    const openModal = (index) => {
        console.log(index)
        setPhotoIndex(index);
        setIsOpen(true);
    };
    return (

        <>
            <PageHeading text={"Gallery"} url={"/static/media/image2.2afdf2e7a647b3e0e510.png"}></PageHeading>

            <Layout
                className="grid-container"
                minWidth={minImgWidth}
                items={layout.map((item,index) => (
                    <img className="gallery-item" src={item.src} alt={item.alt}
                         style={{height: item.height, width: item.width}}
                         onClick={() => {
                             openModal(index)
                         }}>
                    </img>
                ))}
                gap={10}
            >
            </Layout>
            <Lightbox
                index={photoIndex}
                animation={{navigation:100}}
                open={isOpen}
                close={() => setIsOpen(false)}

                on={{view: ({index: currentIndex}) => setPhotoIndex(currentIndex)}}
                slides={images}
                styles={{
                    container: { backgroundColor: "rgba(0,0,0,0.7)",backdropFilter:"blur(3px)", transition: "all 200ms ease" }


            }}
            />


        </>

    );
};

export default Gallery;