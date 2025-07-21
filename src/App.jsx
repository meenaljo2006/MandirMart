import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/navbar'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from "./Pages/Home"
import ShopCategory from './Pages/ShopCategory'
import LoginSignup from './Pages/LoginSignup'
import Product from "./Pages/Product"
import Cart from "./Pages/Cart"

function App() {
  

  return (
    <>
      <div>
        <BrowserRouter>
           <Navbar/>
           <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/mandirs" element={<ShopCategory category="mandirs"/>}/>
              <Route path="/idols" element={<ShopCategory category="idols"/>}/>
              <Route path="/puja" element={<ShopCategory category="puja"/>}/>
              <Route path="/decors" element={<ShopCategory category="decors"/>}/>
              <Route path="/Product/:productId" element={<Product/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/login" element={<LoginSignup/>}/>
           </Routes>
        </BrowserRouter>
       

      </div>
      
    </>
  )
}

export default App
