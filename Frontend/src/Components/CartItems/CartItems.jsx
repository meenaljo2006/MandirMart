import React, { useContext } from 'react'
import "./CartItems.css"
import { HomeContext } from '../../Context/HomeContext'
import remove_icon from "../assets/trash.webp"
import {loadStripe} from '@stripe/stripe-js';

const CartItems = () => {
    const {getTotalCartItems,getTotalCartAmount,all_product,cartItems,removeFromCart} = useContext(HomeContext);

    const makePayment= async()=>{
        const stripe = await loadStripe("pk_test_51RpDUkRwKF1jcqAd9NgDdSWKOl6Uv1pSXORvzcf4EbnSzspXKiRoxOUUKfp3qrE56seB2PmSfKsxZVgSFtMmUybT00FlyMa1z6");
        const cart = [];
            for (let id in cartItems) {
                if (cartItems[id] > 0) {
                    const product = all_product.find(p => p.id === Number(id));
                    if (product) {
                        cart.push({
                        name: product.name,
                        image: product.image,
                        price: product.new_price,
                        quantity: cartItems[id],
                        });
                    }
                }
            }

        console.log("Cart being sent to backend:", cart)
        const response = await fetch (`http://localhost:4000/create-checkout-session`,{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({products:cart})   
        })

        const session =await response.json();
        console.log("Session Response:", session);

        const result = await stripe.redirectToCheckout({
            sessionId:session.id
        })

        if(result.error){
            console.log(result.error);
        }

    }

  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr/>

        {all_product.map((e)=>{
            if(cartItems[e.id]>0){
                return <div>
                            <div className="cartitems-format cartitems-format-main ">
                                <img src={e.image} alt="" className='carticon-product-icon'/>
                                <p>{e.name}</p>
                                <p>Rs.{e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>Rs.{e.new_price*cartItems[e.id]}</p>
                                <img className="cartitems-remove-icon"src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt=""/>
                            </div>
                        </div>

            }

            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>Rs.{getTotalCartAmount()}</p>
                    </div>
                    <hr/>
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr/>
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>Rs.{getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button onClick={makePayment}>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='Promo Code'/>
                    <button>Submit</button>
                </div>
            </div>



        </div>
        

    </div>
  )
}

export default CartItems