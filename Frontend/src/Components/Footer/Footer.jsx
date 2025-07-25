import "./Footer.css"
import logo from "../assets/logo2.png"
import instagram_icon from "../assets/instagram_icon.png"
import pinterest_icon from "../assets/pinterest_icon.png"
import whatsapp_icon from "../assets/whatsapp_icon.png"

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-logo">
            <img src={logo} alt=""/>
            <p>Mandir Mart</p>
        </div>
        <ul className="footer-links">
            <li>Product</li>
            <li>Our Stores</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={instagram_icon} alt=""/>
            </div>
            <div className="footer-icons-container">
                <img src={pinterest_icon} alt=""/>
            </div>
            <div className="footer-icons-container">
                <img src={whatsapp_icon} alt=""/>
            </div>
        </div>
        <div className="footer-copyright">
            <hr/>
                <p>Copyright @ 2025 - All Rights Reserved - MadeBy @MeenalJoshi</p>
        </div>
    </div>
  )
}

export default Footer