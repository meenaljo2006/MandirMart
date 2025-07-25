import "./Navbar.css"
import logo from "../assets/logo.png"
import cart_icon from "../assets/cart_icon.png"
import { Link } from 'react-router-dom';
import { useContext, useRef, useState } from "react"
import { HomeContext } from "../../Context/HomeContext";
import nav_dropdown from "../assets/nav_dropdown.png"

const Navbar = ()=>{

    const[menu,setMenu] = useState("home");
    const{getTotalCartItems} = useContext(HomeContext);
    const menuRef = useRef();

    const dropdown_toggle =()=>{
        menuRef.current.classList.toggle("nav-menu-visible");
        e.target.classList.toggle("open");
    }

    return(
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt=""/>
                <p>𝕄𝔸ℕ𝔻𝕀ℝ 𝕄𝔸ℝ𝕋</p>
            </div>
            <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt=""/>
            <ul ref ={menuRef} className="nav-menu">
                <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration:"none"}} to="/">Home</Link>{menu==="home"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("mandirs")}}><Link style={{textDecoration:"none"}} to="/mandirs">Mandirs</Link>{menu==="mandirs"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("idols")}}><Link style={{textDecoration:"none"}} to="/idols">Idols</Link>{menu==="idols"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("puja")}}><Link style={{textDecoration:"none"}} to="/puja">Puja Samagri</Link>{menu==="puja"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem("auth-token")?<button onClick={()=>{localStorage.removeItem("auth-token"); window.location.replace("/")}}>Logout</button>
                :<Link to="/login"><button>Login</button></Link>}
                
                <Link to="/cart"><img src={cart_icon} alt=""/></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )

}

export default Navbar