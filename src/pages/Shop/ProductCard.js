import React from "react";

const ProductCard = ({product, onClick, getImageSourceCallback}) => {
    return (
        <div key={product.id} className="product-card" onClick={onClick}>
            <img src={getImageSourceCallback} alt={product.name}/>
            {// TODO: add proper image fetching functionality
            }
            <h3>{product.name}</h3>
            <p className={"price-tag"}>${product.default_sku.price.toFixed(2)}</p>
        </div>
    );
};

export default ProductCard;