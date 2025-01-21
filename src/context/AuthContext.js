import React, {createContext, useContext, useEffect, useState} from 'react';
import {default as axios} from "./AxiosInstance";
import {BASE_URL} from "../services/apiClient";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [currentUser, setCurrentUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(false)

    useEffect(()=>{
       if(token){
           // console.log("Already logged in")
           setCurrentUser(getUserProfile(token))
       }else{
           // console.log("Not logged in")
       }
    },[])

    const removeTokens = () => {
        setToken(null)
        localStorage.removeItem("token")
        setCurrentUser(null)
        localStorage.removeItem("profile")

    }
    const updateToken = (newToken) => {

        localStorage.setItem("token", newToken)
    }



    const getUserProfile = async (token) => {
        try {
            const response = await axios.get(BASE_URL + "users/v1/customer/", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.status >= 200 && response.status < 300) {
                // console.log("Profile response", response.data)
                setCurrentUser(response.data)
                return true
            }
        } catch (e) {
            console.error("Error getting Profile with token", e)
            // throw e
            return false
        }

    }
    const login = async (username, password) => {
        setAuthLoading(true)
        removeTokens()
        try {
            const response = await axios.post(BASE_URL + "users/v1/dj-rest-auth/login/", {username, password})
            if (response.status >= 200 && response.status < 300) {
                let new_token = response.data.access

                const isProfile = await getUserProfile(new_token) //returns true of false
                if (isProfile) {
                    // Success getting profile
                    setToken(new_token)
                    return true
                } else {
                    // Failed getting profile
                    removeTokens()
                    new_token = null
                    return false
                }
            }

        } catch (e) {
            console.error("Error in login function,", e)
            return false
        } finally {
            setAuthLoading(false)
        }
    }
    const logout = async () => {
        setAuthLoading(true)
        removeTokens()
        try {
            const resp = await axios.post(BASE_URL + "users/v1/dj-rest-auth/logout/")
            console.log(resp.data)
        } catch (e) {
            console.error("Error logging out")
            throw e
            //handle this error in navbar
        }
        setAuthLoading(false)

    }

    useEffect(() => {
        if (token) {
            updateToken(token)
        } else {
            removeTokens()

        }
    }, [token])

    return (
        <AuthContext.Provider value={{token, currentUser, login, logout, authLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
export default AuthProvider;