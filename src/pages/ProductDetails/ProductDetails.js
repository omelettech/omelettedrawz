import React from 'react';
import './ProductDetails.css';

function ProductDetails() {
  return (
    <div className="product-details-container">
      <h2 className="product-details-title">Product Name</h2>
      <div className="product-details-content">
        <img src="product-image-url" alt="Product" className="product-details-image" />
        <div className="product-details-info">
          <p className="product-details-description">Product description goes here.</p>
          <p className="product-details-price">$99.99</p>
          <button className="product-details-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
