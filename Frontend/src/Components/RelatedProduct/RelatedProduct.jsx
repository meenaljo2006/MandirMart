import React, { useEffect, useState } from 'react'
import "./RelatedProduct.css"
import Item from '../Item/Item'

const RelatedProduct = () => {
  const[relatedproduct,setRelatedProduct] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:4000/relatedCollection")
    .then((res)=>res.json())
    .then((data)=>setRelatedProduct(data));
  },[])

  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr/>
        <div className="relatedproducts-item">
            {relatedproduct.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default RelatedProduct