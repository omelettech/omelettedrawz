import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';import Navbar from './components/navbar/navbar';
import Home from './pages/Home/home';
import Gallery from './pages/gallery';
import About from './pages/about';
import './styles/app_style.css';
import Shop from "./pages/Shop/Shop";
function App() {
  return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/shop" element={<Shop/>} />

          </Routes>
        </div>
      </Router>
  );
}

export default App;
