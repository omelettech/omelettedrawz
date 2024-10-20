import React from 'react';
import './ProductCard.css';

const BodyCard = ({ title, description, buttonText, reverse=false, img,hover=true ,onClick}) => {
  return (
      <div className={`body-card ${reverse ? 'reverse' : ''} ${hover ? 'hover' : ''}`} onClick={onClick}>

          <div className="body-image">
              <img src={img} alt="image"/>
          </div>
          <div className="body-text">
              <h3>{title}</h3>
              <p>{description}</p>
              {buttonText && <button className="btn primary">{buttonText}</button>}
          </div>
      </div>
  );
};

export default BodyCard;