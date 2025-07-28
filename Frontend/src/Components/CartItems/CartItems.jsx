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
        const response = await fetch (`https://mandirmart.onrender.com/create-checkout-session`,{
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
        <div className="cartitems-table-wrapper">
            <table className="cartitems-table">
                <thead>
                    <tr>
                    <th>Product</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {all_product.map((e) => {
                    if (cartItems[e.id] > 0) {
                        return (
                        <tr key={e.id}>
                            <td><img src={e.image} alt={e.name} className="carticon-product-icon" /></td>
                            <td>{e.name}</td>
                            <td>Rs.{e.new_price}</td>
                            <td>
                            <button className="cartitems-quantity">{cartItems[e.id]}</button>
                            </td>
                            <td>Rs.{e.new_price * cartItems[e.id]}</td>
                            <td>
                            <img
                                src={remove_icon}
                                alt="Remove"
                                className="cartitems-remove-icon"
                                onClick={() => removeFromCart(e.id)}
                            />
                            </td>
                        </tr>
                        );
                    }
                    return null;
                    })}

                    <tr className="summary-row">
                        <td colSpan="4" style={{ textAlign: "left", fontWeight: "bold" }}>Subtotal</td>
                        <td colSpan="2"style={{ textAlign: "right"}}>Rs.{getTotalCartAmount()}</td>
                    </tr>
                    <tr className="summary-row">
                        <td colSpan="4" style={{ textAlign: "left", fontWeight: "bold" }}>Shipping Fee</td>
                        <td colSpan="2" style={{ textAlign: "right"}}>Free</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="cartitems-checkout">
             <p style={{ fontWeight: "bold" ,marginBottom:"15px"}}>Total = Rs.{getTotalCartAmount()}</p>
            <button onClick={makePayment}>PROCEED TO CHECKOUT</button>
        </div>
    </div>
        
  )
}

export default CartItems