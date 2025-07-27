import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from "./Pages/Home"
import ShopCategory from './Pages/ShopCategory'
import LoginSignup from './Pages/LoginSignup'
import Product from "./Pages/Product"
import Cart from "./Pages/Cart"
import Footer from './Components/Footer/Footer'
import mandir_banner from "./Components/assets/mandir_banner.png"

function App() {
  

  return (
    <>
      <div>
        <BrowserRouter>
           <Navbar/>
           <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/mandirs" element={<ShopCategory banner={mandir_banner} category="mandirs"/>}/>
              <Route path="/idols" element={<ShopCategory banner={mandir_banner} category="idols"/>}/>
              <Route path="/puja" element={<ShopCategory banner={mandir_banner} category="puja"/>}/>
              <Route path="/Product/:productId" element={<Product/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/login" element={<LoginSignup/>}/>
           </Routes>
           <Footer/>
        </BrowserRouter>
       

      </div>
      
    </>
  )
}

export default App
