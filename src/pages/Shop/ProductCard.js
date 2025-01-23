import React from "react";
import {BASE_URL} from "../../services/apiClient";

const ProductCard = ({product, onClick, getImageSourceCallback}) => {
    const image ={
        src: BASE_URL+ product.default_sku.associated_image?.image || "default",
        alt: product.default_sku.associated_image?.alt || "No image"
    }
    return (
        <div key={product.id} className="product-card" onClick={onClick}>
            <img src={ image.src } alt={image.alt} className={"product-card-image"}/>

            <h3>{product.name}</h3>
            <p className={"price-tag"}>${product.default_sku.price.toFixed(2)}</p>
        </div>
    );
};

export default ProductCard;