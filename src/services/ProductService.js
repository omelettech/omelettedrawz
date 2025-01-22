import axios from "axios";

export const API_URL = "http://127.0.0.1:8000/products/v1/"
export const fetchProducts = async () => {
    try {
        const response = await axios.get(API_URL + "products/with_default");
        // console.log("Products",response.data)
        return response.data
    } catch (error) {
        throw error;
    }
};
export const fetchFeaturedProducts = async () => {
    try {
        const response = await axios.get(API_URL + "products/featured");
        // console.log(response.data)
        return response.data
    }
    catch (error) {
        console.error(error)
        throw error
    }
}

export const getProductVariations = async (id)=>{
    try {
        return await axios.get(API_URL + "product_skus/search_product/" + id)
    }catch (e){
        console.error(e)
        throw e
    }
}
