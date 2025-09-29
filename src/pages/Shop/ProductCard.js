import React from "react";
import {BASE_URL} from "../../services/apiClient";
import cart from "../Cart/Cart";


const ProductCard = ({product,handleAddToCart}) => {
    const image ={
        // src: BASE_URL+ product.default_sku.associated_image?.image || "default",
        // alt: product.default_sku.associated_image?.alt || "No image"

        src:product.src,
        alt:product.alt
    }
    return (
        <div key={product.id} className="product-card">
            <img src={ image.src } alt={image.alt} className={"product-card-image"}/>

            <h3>{product.name}</h3>
            <p className={"price-tag"}>${product.price.toFixed(2)}</p>
            <button
                className="add-to-cart-btn"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the card's onClick
                    handleAddToCart(product);
                }}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;