import "./Popular.css"
import Item from "../Item/Item"
import { useState,useEffect,useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const Popular = () => {

  const[popularProduct,setPopularProduct] = useState([]);
  const scrollRef = useRef(null);

  useEffect(()=>{
    fetch("http://localhost:4000/relatedCollection")
    .then((res)=>res.json())
    .then((data)=>setPopularProduct(data));
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
    <div className="popular">
        <h1>Devotional Picks of the Week</h1>
        <hr/>
        
        <div className="popular-item-scroll" ref={scrollRef}>
            {popularProduct.map((item,i)=>{
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

export default Popular