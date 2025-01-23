import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

const ImageCarousel = ({ images }) => {
    console.count('counter')
    let MEDIA_URL = "http://127.0.0.1:8000"

    const scrollBackToFirst=()=>{
        const swiper = document.querySelector('.swiper').swiper;

        // Now you can use all slider methods like
        // swiper.slideTo(0,1);
        console.log(swiper)

    }
    return (
        <div className="image-carousel-container">
            <Swiper
                style={{maxHeight:"650px"}}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => scrollBackToFirst()}
                centeredSlides={true}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={MEDIA_URL+image.image} alt={`Product ${index + 1}`}
                             className="product-carousel-image"

                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ImageCarousel;
