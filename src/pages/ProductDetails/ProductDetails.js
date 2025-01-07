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
                    onClick={() => {
                        setCurrentVariation(sku)
                    }}

                >
                    <div
                        className={`product-variation ${currentVariation.id === sku.id ? "selected" : "not-selected"}`}>
                        <p>{sku.size_attribute_value || "Variation"}</p>
                    </div>

                </div>
            )
        })
    }


    return (
        <div className="product-detail-container">
            <div className={"product-detail-image-container"}>
                {/*<img src={product.image} alt={product.name} className="product-detail-image"/>*/}
                <img src={"http://127.0.0.1:8000/media/images/8357566.jpg"} alt={product.name}
                     className="product-detail-image"/>
            </div>
            <div className="product-detail-info">
                <h2 className="product-title">{product.name}</h2>

                <div>
                    <small>Description:</small>
                    <p className="product-description">{product.description}</p>
                </div>

                <div style={{display: "flex", gap: 50}}>

                    <div>
                        <small>Category:</small>
                        <p className={"product-description"}>{product.category}</p>

                    </div>
                    <div>
                        <small>Summary:</small>
                        <p className="product-description">{product.summary}</p>

                    </div>

                </div>

                <div>
                    <small>Price:</small>
                    <h3 className="product-price" style={{marginTop: 0}}>${currentVariation.price}</h3>

                </div>

                <div>
                    <small>In stock: {currentVariation.quantity}</small>
                    <br></br>
                    <input type="number" min={1} max={currentVariation.quantity} defaultValue={1}/>
                </div>

                <div className="product-attributes">
                    {ListOfVariations ? getVariations() : <small>No variations</small>}
                </div>

                <button className="add-to-cart-button">Add to Cart</button>
            </div>
            {/* Recommendations Section */}

        </div>
    );
};

export default ProductDetail;
