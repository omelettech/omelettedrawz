import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Shop.css';
import SectionHeading from "../../components/SectionHeading/SectionHeading.tsx";
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import SidebarShop from "../../components/SidebarShop/SidebarShop";

const API_URL = "http://127.0.0.1:8000"


const filters = [
    {
        name: "Style",
        options: ["Apple", "Samsung", "Sony", "LG"],
    },
    {
        name: "Price range",
        options: ["Under $10", "Under $25", "$25 - $50", "Under $25"],
    },

]
const Shop = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Sticker Pack 1',
            price: 5.99,
            category: 'Stickers',
            image: '/static/media/image2.2afdf2e7a647b3e0e510.png'
        },
        {
            id: 2,
            name: 'Art Print 1',
            price: 12.99,
            category: 'Prints',
            image: '/static/media/image2.2afdf2e7a647b3e0e510.png'
        },
        {
            id: 3,
            name: 'Sticker Pack 2',
            price: 4.99,
            category: 'Stickers',
            image: '/static/media/image2.2afdf2e7a647b3e0e510.png'
        },
        {
            id: 4,
            name: 'Art Print 2',
            price: 16.99,
            category: 'Prints',
            image: '/static/media/image2.2afdf2e7a647b3e0e510.png'
        },
    ]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(API_URL + '/api/printful/products/');
                setProducts(response.data.result);
                console.log(response.data.result)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    const handleFilterChange = (filter) => {
        // Handle filter change
        console.log(filter);
    };
    const getPageContent = () => {
        if (!loading) {
            return (
                <div>


                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="product-card">
                                <img src={product.thumbnail_url} alt={product.name}/>
                                <h3>{product.name}</h3>
                                {/*<p>${product.price.toFixed(2)}</p>*/}
                            </div>
                        ))}
                    </div>
                </div>
            )
        } else {
            return (<div>LOADING</div>)
        }

    }

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === 'All' || product.category === selectedCategory)
    );

    function getSideBarContent() {
        return (
            <SidebarShop
                categories={["Stickers", "Prints"]}
                filters={filters}
                onFilterChange={handleFilterChange}
            > </SidebarShop>
        )
    }

    return (
        <>
            <PageHeading url={"/static/media/image2.2afdf2e7a647b3e0e510.png"} text={"Store"}></PageHeading>

            <div>
                <SectionHeading text={"Artist picks"} align={"center"}></SectionHeading>

                <div className="shop-container">
                    <div className={"shop-sidebar"}>
                        {getSideBarContent()}
                    </div>
                    {getPageContent()}

                </div>
            </div>
        </>
    );


};

export default Shop;