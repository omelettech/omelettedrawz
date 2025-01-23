import {BASE_URL} from "./apiClient";
import axios from "../context/AxiosInstance";
export const API_URL = BASE_URL+"orders/"

export const fetchCart= async ()=>{
    try{
        const res =await axios.get(API_URL+"v1/cart/")
        // console.log(res.data)
        return res.data
    }catch (e){
        throw e
    }
}

export const PostAddToCart= async (product_sku, quantity)=>{
    console.log(product_sku,quantity)
    return await axios.post(API_URL+"v1/cart/",{product_sku:product_sku,quantity: quantity})
}

export const DeleteCartItem = async (id)=>{
    console.log("Deleting Cart item", id)
    return await axios.delete(API_URL+"v1/cart/"+id)
}

export const PutCartItem = async (id,newQuantity)=>{
    console.log("Putting Cart item",id,newQuantity)
    return await axios.put(API_URL+`v1/cart/${id}`,{quantity:newQuantity})
}