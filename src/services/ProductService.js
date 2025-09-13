import axios from "axios";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../config/firebase";

export const API_URL = "http://127.0.0.1:8000/products/v1/"
export const fetchProducts = async () => {
    try {
        // const response = await axios.get(API_URL + "products/with_default");
        // console.log("Products",response.data)
        // return response.data
        const snapshot = await getDocs(collection(db, "products"));
        return snapshot.docs.map(doc => {
            // Get the document ID (Firestore assigns this automatically)
            const documentId = doc.id;

            // Get the data fields (the actual product info you stored in Firestore)
            const documentData = doc.data();
            console.log({
                id: documentId,
                name: documentData.name,
                price: documentData.price,
                src: documentData.src
            })
            // Build a new object that combines ID + fields
            return {
                id: documentId,
                name: documentData.name,
                description:documentData.description,
                summary:documentData.summary,
                price: documentData.price,
                src:documentData.src,
                alt:documentData.alt
            };
        });
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
