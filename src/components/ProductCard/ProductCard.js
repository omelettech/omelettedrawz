import React from 'react';
import './ProductCard.css';

const ProductCard = ({ title, description, buttonText, reverse, img }) => {
  return (
    <div className={`product-card ${reverse ? 'reverse' : ''}`}>
      <div className="product-text">
        <h3>{title}</h3>
        <p>{description}</p>
        <button className="btn primary">{buttonText}</button>
      </div>
      <div className="product-image">
        <img src={img} alt="Product" />
      </div>
    </div>
  );
};

export default ProductCard;