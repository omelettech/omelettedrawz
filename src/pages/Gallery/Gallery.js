import React, {useEffect, useState} from 'react';
import './Gallery.css';
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';

import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/image3.png";
import image4 from "../../assets/images/image4.png";
import image5 from "../../assets/images/image5.png";
import image7 from "../../assets/images/Illustration2.png";
import image8 from "../../assets/images/mombatti.png";
import image9 from "../../assets/images/rani2.png";
import image10 from "../../assets/images/red guy2.png";

import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";


const images = [
    {src: image1, width: 4000, height: 4000, alt: "alt"},
    {src: image2, width: 2362, height: 3496, alt: "alt"},
    {src: image3, width: 4000, height: 4000, alt: "alt"},
    {src: image4, width: 3600, height: 4800, alt: "alt"},
    {src: image5, width: 3000, height: 3750, alt: "alt"},
    {src: image7, width: 4000, height: 4000, alt: "alt"},
    {src: image8, width: 3000, height: 3750, alt: "alt"},
    {src: image9, width: 2406, height: 3006, alt: "alt"},
    {src: image10, width: 3000, height: 3750, alt: "alt"},

]

const minImgWidth = 500
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

            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                style={{margin: "3rem"}}
            >

                <Masonry
                    gutter={"3rem"}
                    itemStyle={{width: "100%", height: "auto", objectFit: "cover"}}

                >
                    {layout.map((item, index) => (
                        <img className="gallery-item" src={item.src} alt={item.alt}
                             onClick={() => {
                                 openModal(index)
                             }}>
                        </img>
                    ))}
                    gap={10}
                </Masonry>


            </ResponsiveMasonry>
            <Lightbox
                index={photoIndex}
                animation={{navigation: 100}}
                open={isOpen}
                close={() => setIsOpen(false)}

                on={{view: ({index: currentIndex}) => setPhotoIndex(currentIndex)}}
                slides={images}
                styles={{
                    container: {
                        backgroundColor: "rgba(0,0,0,0.7)",
                        backdropFilter: "blur(3px)",
                        transition: "all 200ms ease"
                    }


                }}
            />


        </>

    )
        ;
};

export default Gallery;