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
                                                           paddingTop = '1rem',
                                                           paddingBottom = '1rem',
                                                           paddingRight = 10,
                                                           paddingLeft = 10
                                                       }) => {
    // @ts-ignore
    return (
        <div
            className={`section-heading ${align}`}
            style={{
                textAlign: align,
                color: color,
                paddingTop: paddingTop,
                paddingBottom: paddingBottom,
                paddingRight : paddingRight,
                paddingLeft : paddingLeft
            }}
        >
            {React.createElement(size, {className: 'heading'}, text)}
        </div>
    );
};

export default SectionHeading;
