import React from 'react';
import './Popup.css';

const Popup = ({children}) => {
    return (
        <div className="popup">
            <div className={"popup-container"}>
                {children}
            </div>
        </div>
    );
};

export default Popup;