import "./Offer.css"
import offer_image from "../assets/offer1.png"
import off from "../assets/off.png"

const Offer = () => {
  return (
    <div className="offers">
        <div className="offers-left">
            <h1>Shubh</h1>
            <h1>Aarambh Combo✨</h1>
            <p>Your complete spiritual setup in one box !</p>
            <button>Shop Combo Now</button>
        </div>
        <div className="offers-right">
            <img src={offer_image} alt=""/>
        </div>
    </div>
  )
}

export default Offer