import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Shop.css';
import SectionHeading from "../../components/SectionHeading/SectionHeading.tsx";
const API_URL = "http://127.0.0.1:8000"

const Shop = () => {
    const [products, setProducts] = useState([
        {id: 1, name: 'Sticker Pack 1', price: 5.99, category: 'Stickers', image: '/images/sticker1.png'},
        {id: 2, name: 'Art Print 1', price: 12.99, category: 'Prints', image: '/images/print1.png'},
    ]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(API_URL + '/api/products/');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);


    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === 'All' || product.category === selectedCategory)
    );
    if (!loading) {
        return (
            <>
                <SectionHeading text={"Artist picks"} align={"center"}></SectionHeading>
                <div className="shop-container">
                <div className="filter-bar">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        <option value="Stickers">Stickers</option>
                        <option value="Prints">Prints</option>
                        {/* Add more categories as needed */}
                    </select>
                </div>

                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name}/>
                            <h3>{product.name}</h3>
                            <p>${product.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>
            </>
        );
    } else {
        return (
            <div>Loading</div>
        )

    }
};

export default Shop;