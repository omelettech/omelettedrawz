import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './pages/Home/Home';
import Gallery from './pages/Gallery/Gallery';
import About from './pages/About';
import './styles/app_style.css';
import Shop from "./pages/Shop/Shop";
import Contact from "./pages/Contact/Contact";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import {AuthProvider} from "./context/AuthContext";

function App() {
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
