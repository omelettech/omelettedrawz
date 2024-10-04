import React from 'react';
import './card.css';

const Card = ({
                  image,
                  title,
                  description,

                  onClick = () => {
                      console.log(`Clicked ${title}`)
                  }

              }) => {
    return (
        <div className="card" onClick={onClick}>
            <img src={image} alt={title} className="card-image"/>
            <div className="card-content">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Card;
