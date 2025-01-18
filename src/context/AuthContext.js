import React, {createContext, useState, useEffect, useMemo, useContext} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../config/firebase';
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    const updateToken = (newToken) => {

        setToken(newToken);
    };
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         setCurrentUser(user);
    //     });
    //
    //     return () => unsubscribe();
    // }, []);
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token', token);
            // update current user

        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token')
        }
    }, [token]);

    const updateCurrentUser=()=>{
        try {
            const resp = axios.get("http://127.0.0.1:8000/users/v1/dj-rest-auth/user/")
            resp.then((resp) => {
                setCurrentUser(resp.data)
            }).catch((e) => console.error(e))
        } catch (e) {
            throw e
        }
    }

    const contextValue = useMemo(
        () => ({
            token,
            updateToken,
            currentUser,
            updateCurrentUser
        }),
        [token]
    );
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
export default AuthProvider;