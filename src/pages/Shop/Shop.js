import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Shop.css';
import SectionHeading from "../../components/SectionHeading/SectionHeading.tsx";
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import SidebarShop from "../../components/SidebarShop/SidebarShop";
import ProductDetails from "../ProductDetails/ProductDetails";
import ProductDetail from "../ProductDetails/ProductDetails";

const API_URL = "http://127.0.0.1:8000/products/v1/"


const filters = [
    {
        name: "Category",
        type: "checkbox",
        options: ["Original", "Anime", "Games", "Misc"],
    },
    {
        name: "Price range",
        type: "radio",
        options: ["Under $10", "Under $25", "$25 - $50", "Under $25"],
    },
    {
        name: "Size",
        type: "checkbox",
        options: ["1.5x1.5", "2x2", "3x3", "4x4"],
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
    const [selectedProduct, setSelectedProduct] = useState(null)
    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await axios.get(API_URL + "products/with_default");

                setProducts(response.data);
                console.log(response.data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    const handleFilterChange = (filter) => {

        console.log(filter);
    };
    const handleProductClick = (product) => {
        setSelectedProduct(product)
    }
    const onClose = () => {
        setSelectedProduct(null)
    }
    const getProductImage = (id) => {
        return "http://127.0.0.1:8000/media/images/8357566.jpg"

    }
    const getPageContent = () => {
        if (!loading) {
            return (
                <div>
                    <div className="products-grid">
                        {filteredProducts.map((product) => {
                            if(product.default_sku && !product.deleted_at){
                                return(

                                    <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
                                        <img src={getProductImage(1)} alt={product.name}/>
                                        {// TODO: add proper image fetching functionality
                                        }
                                        <h3>{product.name}</h3>
                                        {/*<p>${product.price}</p>*/}
                                    </div>
                                )
                            }
                            }
                        )}
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
            {selectedProduct &&
                <div className="modal-overlay" onClick={onClose}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <span className="modal-close" onClick={onClose}>&times;</span>

                        <ProductDetail product={selectedProduct} productSku={selectedProduct.default_sku}/>
                    </div>
                </div>
            }

            <PageHeading url={"/static/media/image2.2afdf2e7a647b3e0e510.png"} text={"Store"}></PageHeading>

            <div>
                <SectionHeading text={"Artist picks"} align={"center"}></SectionHeading>

                <div className="shop-container">
                    <div className={"shop-sidebar"}>
                        {getSideBarContent()}
                    </div>
                    {!loading && getPageContent()}

                </div>
            </div>
        </>
    );


};

export default Shop;