import React, { useEffect, useState ,useRef} from 'react'
import "./RelatedProduct.css"
import Item from '../Item/Item'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RelatedProduct = () => {
  const[relatedproduct,setRelatedProduct] = useState([]);
  const scrollRef = useRef(null);


  useEffect(()=>{
    fetch("https://mandirmart.onrender.com/relatedCollection")
    .then((res)=>res.json())
    .then((data)=>setRelatedProduct(data));
  },[])

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr/>

        <div className="relatedproducts-item-scroll" ref={scrollRef}>
            {relatedproduct.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>

        <div className="scroll-buttons">
          <button onClick={() => scroll("left")}><FaChevronLeft /></button>
          <button onClick={() => scroll("right")}><FaChevronRight /></button>
        </div>

    </div>
  )
}

export default RelatedProduct