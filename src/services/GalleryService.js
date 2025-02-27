import axios from "../context/AxiosInstance";
import {BASE_URL} from "./apiClient";

const API_URL = BASE_URL+"images/"
export const fetchGalleryItems=async ()=>{
    try{
        const response = await axios.get(API_URL+"v1/GalleryItem")
        return response.data
    }catch (e){
        throw e
    }
}