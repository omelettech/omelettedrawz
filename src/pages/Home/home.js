import React from 'react';
import Card from "../../components/Card/card";

const Home = () => {
    const recentArtworks = [
        {
            image: 'https://via.placeholder.com/300',
            title: 'Artwork 1',
            description: 'Description of artwork 1',
        },
        {
            image: 'https://via.placeholder.com/300',
            title: 'Artwork 2',
            description: 'Description of artwork 2',
        },
        {
            image: 'https://via.placeholder.com/300',
            title: 'Artwork 3',
            description: 'Description of artwork 3',
        },
    ];

    return (
        <div className="home">
            <div className="hero">
                <img src="https://via.placeholder.com/1920x1080" alt="Hero" />
            </div>
            <div className="gallery">
                <h2>Gallery</h2>
                <div className="gallery-grid">
                    {recentArtworks.map((artwork, index) => (
                        <Card
                            key={index}
                            image={artwork.image}
                            title={artwork.title}
                            description={artwork.description}
                        />
                    ))}
                </div>
            </div>
            <footer>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/src/pages/gallery">Gallery</a></li>
                    <li><a href="/src/pages/about">About</a></li>
                </ul>
            </footer>
        </div>
    );
};

export default Home;
