import "./ProductDisplay.css"
import star_icon from "../assets/star_icon.png"
import star_dull_icon from "../assets/star_dull_icon.png"
import { useContext } from "react";
import { HomeContext } from "../../Context/HomeContext";

const ProductDisplay = (props) => {
    const{product} = props;
    const{addToCart} = useContext(HomeContext);

  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt=""/>
                <img src={product.image} alt=""/>
                <img src={product.image} alt=""/>
                <img src={product.image} alt=""/>
            </div>
            <div className="productdisplay-img">
                <img className="productdisplay-main-img" src={product.image} alt=""/>
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-star">
                <img src={star_icon} alt=""/>
                <img src={star_icon} alt=""/>
                <img src={star_icon} alt=""/>
                <img src={star_icon} alt=""/>
                <img src={star_dull_icon} alt=""/>
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">Rs.{product.old_price}</div>
                <div className="productdisplay-right-price-new">Rs.{product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">Elevate your pooja space with this elegant and compact mandir, ideal for flats, apartments, and modern homes. Crafted with a smooth finish and subtle detailing, this mandir offers just the right space to place your idols and essentials. Whether used on a tabletop or wall-mounted, it brings grace and serenity to your home with every prayer.
            </div>
            <button onClick={( )=>{addToCart(product.id)}} >Add to Cart</button>

        </div>

        
    </div>

  )
}

export default ProductDisplay