// @ts-ignore
import React from 'react';
import './PageHeading.css'; // Import the CSS file for styling

type PageHeadingProps = {
    url: string | object;
    text: string;
    color?: string;
};

const PageHeading: React.FC<PageHeadingProps> = ({text, color = 'var(--primary-color)',url}) => {
    // @ts-ignore
    return (
        <div
            className={`page-heading`}
            style={{backgroundImage: `url(${url})` }}
        >
            <div className={"overlay"}>
                {React.createElement("h1", {className: 'heading'}, text)}
            </div>
        </div>
    );
};

export default PageHeading;
