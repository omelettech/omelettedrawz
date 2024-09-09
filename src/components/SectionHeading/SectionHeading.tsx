// @ts-ignore
import React from 'react';
import './SectionHeading.css'; // Import the CSS file for styling

type SectionHeadingProps = {
    text: string;
    align?: 'left' | 'center' | 'right';
    size?: 'h1' | 'h2' | 'h3';
    color?: string;
    paddingTop?: string;
    paddingBottom?: string;
};

const SectionHeading: React.FC<SectionHeadingProps> = ({
                                                           text,
                                                           align = 'left',
                                                           size = 'h2',
                                                           color = 'var(--primary-color)', // Use CSS variable for primary color
                                                           paddingTop = '1.5rem',
                                                           paddingBottom = '1.5rem',
                                                           paddingRight = 0,
                                                           paddingLeft = 0
                                                       }) => {

    return (
        <div
            className={`section-heading ${align}`}
            style={{
                // @ts-ignore
                TextAlign: align,
                color: color,
                paddingTop: paddingTop,
                paddingBottom: paddingBottom,
                paddingRight : paddingRight,
                paddingLeft : paddingLeft,

            }}
        >
            {React.createElement(size, {className: 'heading'}, text)}
        </div>
    );
};

export default SectionHeading;
