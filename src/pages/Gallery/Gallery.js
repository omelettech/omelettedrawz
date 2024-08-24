import {useEffect, useState} from 'react';
import './Gallery.css';
import Layout from 'react-masonry-list';

import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/image3.png";
import image4 from "../../assets/images/image4.png";
import image5 from "../../assets/images/image5.png";


const images = [
    {src: image1, width: 4000, height: 4000, alt: "alt"},
    {src: image2, width: 2362, height: 3496, alt: "alt"},
    {src: image3, width: 4000, height: 4000, alt: "alt"},
    {src: image4, width: 3600, height: 4800, alt: "alt"},
    {src: image5, width: 3000, height: 3750, alt: "alt"},
]

const minImgWidth = 600
const calculateHeight=(w,h)=>{
    return w<=minImgWidth? h : Math.round((h/(w/minImgWidth))*100)/100
}



const Gallery = () => {
    const [layout, setLayout] = useState([]);

    useEffect(() => {
        const layoutData = images.map((img) => {


            return {...img,
                width:img.width<minImgWidth?img.width:minImgWidth,
                height: calculateHeight(img.width,img.height)
            };
        });

        setLayout(layoutData);
    }, []);
    console.log(layout)
    return (
        <Layout
            className="grid-container"
            minWidth={minImgWidth}
            items={layout.map((item) => (

                    <img className="gallery-item" src={item.src} alt={item.alt} style={{height:item.height,width:item.width}}>
                    </img>


            ))}
            gap={5}
        ></Layout>
    );
};

export default Gallery;