import React from 'react';
import './Popup.css';

const Popup = ({children,onClickBG}) => {
    return (
        <div className="popup" onClick={onClickBG}>
            <div className={"popup-container"}>
                {children}
            </div>
        </div>
    );
};

export default Popup;