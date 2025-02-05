import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Shop.css';
import SectionHeading from "../../components/SectionHeading/SectionHeading.tsx";
import PageHeading from "../../components/PageHeading/PageHeading.tsx";
import SidebarShop from "../../components/SidebarShop/SidebarShop";
import ProductDetails from "../ProductDetails/ProductDetails";
import ProductDetail from "../ProductDetails/ProductDetails";
import ProductCard from "./ProductCard";
import {fetchFeaturedProducts, fetchProducts} from "../../services/ProductService";


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

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [featuredProducts, setFeaturedProducts] = useState([])

    useEffect(() => {

        fetchProducts().then((data) => {
            setProducts(data)
        }).catch((error) => {
            console.error('Error fetching products:', error);
        }).finally(() => {
            setLoading(false)
        })

        fetchFeaturedProducts().then((data) => {
            setFeaturedProducts(data.slice(0,window.innerWidth>1200 || window.innerWidth<=700?4:3))
        }).catch((err) => {
            console.error('Error fetching featured products:', err);
        }).finally(() => setLoading(false))
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
                                if (product.default_sku && !product.deleted_at) {
                                    return (

                                        <ProductCard product={product} onClick={() => handleProductClick(product)}
                                                     getImageSourceCallback={getProductImage(1)}></ProductCard>
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

    const getFeaturedContent = () => {
        return (
            <div className="products-grid">
                {featuredProducts.map((product) => {
                        if (product.default_sku && !product.deleted_at) {
                            return (
                                <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)}
                                             getImageSourceCallback={getProductImage(1)}></ProductCard>
                            )
                        }
                    }
                )}
            </div>
        )
    };
    return (
        <>
            {selectedProduct &&
                <div className="modal-overlay" onClick={onClose}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <span className="modal-close" onClick={onClose}>&times;</span>

                        <ProductDetail product={selectedProduct} productSku={selectedProduct.default_sku} onClose={onClose}/>
                    </div>
                </div>
            }

            <PageHeading url={"/static/media/image2.2afdf2e7a647b3e0e510.png"} text={"Store"}></PageHeading>

            <div>
                <SectionHeading text={"Artist picks"} align={"center"}></SectionHeading>

                <div className="shop-container">
                    {/*<div className={"shop-sidebar"}>*/}
                    {/*    {getSideBarContent()}*/}
                    {/*</div>*/}
                    {!loading && getFeaturedContent()}
                </div>
            </div>

            <div>
                <SectionHeading text={"All products"} align={"center"}></SectionHeading>
                <br/>
                <hr/>
                <br/>
                <div className="shop-container">
                    {/*<div className={"shop-sidebar"}>*/}
                    {/*    {getSideBarContent()}*/}
                    {/*</div>*/}
                    {
                        (!loading && getPageContent())
                        ||
                        <div>Loading</div>
                    }
                </div>
            </div>
        </>
    );


};

export default Shop;