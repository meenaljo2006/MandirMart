import "./Navbar.css"
import logo from "../assets/logo2.png"
import cart_icon from "../assets/cart_icon.png"
import person_icon from "../assets/personIcon.jpg"
import { Link ,useLocation} from 'react-router-dom';
import { useContext, useRef, useState } from "react"
import { HomeContext } from "../../Context/HomeContext";

const Navbar = ()=>{

    const[menu,setMenu] = useState("home");
    const{getTotalCartItems} = useContext(HomeContext);
    const location = useLocation();
    const menuRef = useRef();
     const [dropdownOpen, setDropdownOpen] = useState(false);
    

    const username = localStorage.getItem("username");
    const initial = username ? username.charAt(0).toUpperCase() : "?";
    const isLoggedIn = localStorage.getItem("auth-token");


    return(
        <div className="navbar">
            <Link style={{textDecoration:"none"}} to="/"className="nav-logo">
                <img src={logo} alt=""/>
                <p>𝕄𝔸ℕ𝔻𝕀ℝ 𝕄𝔸ℝ𝕋</p>
            </Link>

            

            <ul ref ={menuRef} className="nav-menu">
                <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration:"none"}} to="/">Home</Link>{location.pathname === "/" && <hr />}</li>
                <li onClick={()=>{setMenu("mandirs")}}><Link style={{textDecoration:"none"}} to="/mandirs">Mandirs</Link>{location.pathname === "/mandirs" && <hr />}</li>
                <li onClick={()=>{setMenu("idols")}}><Link style={{textDecoration:"none"}} to="/idols">Idols</Link>{location.pathname === "/idols" && <hr />}</li>
                <li onClick={()=>{setMenu("puja")}}><Link style={{textDecoration:"none"}} to="/puja">Puja Samagri</Link>{location.pathname === "/puja" && <hr />}</li>
            </ul>
                
            <div className="nav-login-cart">

                {localStorage.getItem("auth-token")?<button onClick={()=>{localStorage.removeItem("auth-token"); window.location.replace("/")}}>Logout</button>
                :<Link to="/login"><button>Login</button></Link>}

                <div className="hamburger-icon" onClick={() => setDropdownOpen(!dropdownOpen)}>☰</div>

                <Link to="/cart"><img src={cart_icon} alt=""/></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>

                {isLoggedIn ?
                <div className="info">
                    <div className="nav-user-initial">{initial}</div>
                </div>
                : <img className="person-icon" src={person_icon} alt="Login" />}

            </div>

            {dropdownOpen && (
                <div className="mobile-dropdown">
                <Link to="/" onClick={() => setDropdownOpen(false)}>🏠 Home</Link>
                <Link to="/mandirs" onClick={() => setDropdownOpen(false)}>🛕 Mandirs</Link>
                <Link to="/idols" onClick={() => setDropdownOpen(false)}>🧿 Idols</Link>
                <Link to="/puja" onClick={() => setDropdownOpen(false)}>📿 Puja Samagri</Link>
                {/* <Link to="/cart" onClick={() => setDropdownOpen(false)}>🛒 Cart</Link> */}
                {isLoggedIn ? (
                    <button onClick={()=>{localStorage.removeItem("auth-token"); window.location.replace("/")}}>🔓 Logout</button>
                ) : (
                    <Link to="/login" onClick={() => setDropdownOpen(false)}>🔓 Login</Link>
                )}
                </div>
            )}




        </div>
    )

}

export default Navbar