import React, {useEffect, useState} from "react";
import "./ProductDetails.css"
import axios from "axios";

const ProductDetail = ({product, productSku}) => {
    const [currentVariation, setCurrentVariation] = useState(productSku)
    const [ListOfVariations, setListOfVariations] = useState(null)
    const fetchProductVariations = async (id) => {
        try {
            let response = await axios.get("http://127.0.0.1:8000/products/v1/product_skus/search_product/" + id)
            setListOfVariations(response.data)
            return response.data
        } catch (error) {
            console.error('Error fetching product variations ', error)
        }
    }


    useEffect(() => {
        return () => {
            fetchProductVariations(product.id)
        };
    }, []);


    const getVariations = () => {
        return ListOfVariations.map((sku) => {
            return (
                <div
                    key={sku.id}
                    onClick={() => {setCurrentVariation(sku)}}

                >
                    <div className="product-variation">
                        <small>{sku.size_attribute_value}</small>
                    </div>

                </div>
            )
        })
    }


    return (
        <div className="product-detail-container">
            <h2 className="product-title">{product.name}</h2>
            <img src={product.image} alt={product.name} className="product-detail-image"/>
            <p className="product-description">{product.description}</p>


            <p className="product-price">price: ${currentVariation.price}</p>
            <p className="product-price">qty:{currentVariation.quantity}</p>

            <div className="product-attributes">
                {ListOfVariations ? getVariations() : <p>Loading</p>}
            </div>

            <button className="add-to-cart-button">Add to Cart</button>

            {/* Recommendations Section */}

        </div>
    );
};

export default ProductDetail;
