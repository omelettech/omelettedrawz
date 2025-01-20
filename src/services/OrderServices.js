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