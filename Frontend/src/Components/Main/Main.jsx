
import "./Main.css"
import hand_fold from "../assets/hand_fold.png"
import arrow_icon from "../assets/arrow.png"
import mandir from "../assets/demo.png"
import { Link } from "react-router-dom"


const Main = () => {
  return (
    <div className='main'>
        <div className="main-left">
            <h2>Bring Home Blessings</h2>
            <div>
                <div className="main-hand-icon">
                    <p>दिव्य</p>
                    <img src={hand_fold} alt=""/>
                </div>
                <p>Collections</p>
                <p>for your Home</p>
            </div>
            <Link to="/mandirs" style={{ textDecoration: "none"}}>
                <div className="main-btn">
                    <div>Shop Now</div>
                    <img src={arrow_icon} alt="arrow" />
                </div>
            </Link>
        </div>
        <div className="main-right">
            <img src={mandir} alt=""/>
        </div>

    </div>
  )
}

export default Main
