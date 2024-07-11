import React from 'react';
import './HeroSection.css'; // Import your CSS file

const HeroSection = () => {
  return (
    <section id="hero-section">
      <div id="head-line"></div>
      {[0, 1, 2, 3].map(i => (
        <section key={i} id={`section0${i}`}>
          <div id="heading"></div>
        </section>
      ))}
      <a id="youtube" href="https://www.youtube.com/watch?v=m1IU7zjl1k4" target="_blank" rel="noopener noreferrer">
        <i className="fa fa-youtube-play"></i>
      </a>
    </section>
  );
};

export default HeroSection;
