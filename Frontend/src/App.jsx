import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from "./Pages/Home"
import ShopCategory from './Pages/ShopCategory'
import LoginSignup from './Pages/LoginSignup'
import Product from "./Pages/Product"
import Cart from "./Pages/Cart"
import Footer from './Components/Footer/Footer'
import AfterPayment from './Pages/afterPayment'
import mandir_banner from "./Components/assets/mandir_banner.png"

function App() {

  useEffect(() => {
    // Ping every 10 minutes to keep server alive
    const interval = setInterval(() => {
      fetch("https://mandirmart.onrender.com/")
        .then((res) => console.log("Server pinged"))
        .catch((err) => console.error("Ping failed", err));
    }, 12 * 60 * 1000); // 12 minutes

    return () => clearInterval(interval); // Clean up on unmount
  }, []);
  

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
              <Route path="/payment" element={<AfterPayment/>} />
              <Route path="/login" element={<LoginSignup/>}/>
           </Routes>
           <Footer/>
        </BrowserRouter>
       

      </div>
      
    </>
  )
}

export default App
