import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000/"
export const MEDIA_URL = BASE_URL + "media/"
export const test_auth = async () => {
    // console.log(localStorage.getItem("token"))
    console.log(await axios.get("http://127.0.0.1:8000/users/v1/dj-rest-auth/user/"))
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
