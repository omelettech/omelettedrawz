import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
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
import Cart from "./pages/Cart/Cart";
import ComingSoon from "./pages/ComingSoon";

function App() {
    const currentUser = useContext(AuthContext)
    document.body.setAttribute('data-theme', 'dark');

    return (

        <AuthProvider>
            <Router>
                <Navbar/>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/shop" element={<ComingSoon/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/gallery" element={<Gallery/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path={"/cart"} element={<Cart/>}></Route>

                </Routes>
                <div className={"cart-btn"}>
                    <Link to={"/cart"} style={{width:"100%",height:"100%"}}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 576 512">
                            <path
                                d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                        </svg>
                    </Link>
                </div>
            </Router>

        </AuthProvider>
    );
}

export default App;
