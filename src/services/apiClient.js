import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000/"

export const test_auth = ()=>{
    console.log(localStorage.getItem("token"))
    return axios.get("http://127.0.0.1:8000/users/v1/dj-rest-auth/user/")
}

export const login = async (username,password) =>{
    try{
        const res =await axios.post(BASE_URL+"users/v1/dj-rest-auth/login/",{
            username,password
        })
        return res.data
    }catch (e){
        throw e
    }
}

// const TOKEN = fetchToken()
//
//
// const apiClient = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${TOKEN}`,
//         'Accept': "application/json"
//     }
// })
