import React from "react";
import "./ProductDetails.css"
const ProductDetail = ({product}) => {
    if (!product) return null;

    return (
        <div className="product-detail-container">
            <h2 className="product-title">{product.name}</h2>
            <img src={product.image} alt={product.name} className="product-detail-image"/>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price}</p>

            <button className="add-to-cart-button">Add to Cart</button>

            {/* Recommendations Section */}

        </div>
    );
};

export default ProductDetail;
