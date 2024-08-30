import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './pages/Home/Home';
import Gallery from "./pages/Gallery/Gallery";
import About from './pages/About';
import Shop from "./pages/Shop/Shop";
import Contact from "./pages/Contact/Contact";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import {AuthContext, AuthProvider} from "./context/AuthContext";
import {useContext, useState} from "react";

function App() {
    const currentUser = useContext(AuthContext)
    document.body.setAttribute('data-theme', 'dark');

    return (

        <AuthProvider>
            <Router>
                <Navbar/>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/shop" element={<Shop/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/gallery" element={<Gallery/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>

                </Routes>
            </Router>

        </AuthProvider>
    );
}

export default App;
