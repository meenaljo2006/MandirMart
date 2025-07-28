import React, { useEffect, useState } from 'react'
import "./ListProduct.css"
import cross_icon from "../../assets/trash.webp"

const ListProduct = () => {

    const [allproducts,setAllProducts] = useState([]);
    const fetchInfo = async()=>{
        await fetch("https://mandirmart.onrender.com/allproducts")
        .then((res)=>res.json())
        .then((data)=>{setAllProducts(data)});
    }

    useEffect(()=>{
        fetchInfo();
    })

    const remove_product = async(id) =>{
        await fetch("https://mandirmart.onrender.com/removeproduct",{
            method:"POST",
            headers:{
                Accept : "application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo();
    }

  return (
    <div className='list-product'>
        <h1>All Products List</h1>
        <div className="listproduct-table-container">
            <table className="listproduct-table">
            <thead>
                <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Old Price</th>
                <th>New Price</th>
                <th>Category</th>
                <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {allproducts.map((product, index) => (
                <tr key={index}>
                    <td>
                    <img
                        src={product.image}
                        alt=""
                        className="listproduct-product-icon"
                    />
                    </td>
                    <td>{product.name}</td>
                    <td>Rs.{product.old_price}</td>
                    <td>Rs.{product.new_price}</td>
                    <td>{product.category}</td>
                    <td>
                    <img
                        onClick={() => remove_product(product.id)}
                        src={cross_icon}
                        alt="remove"
                        className="listproduct-remove-icon"
                        style={{ cursor: 'pointer' }}
                    />
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

    </div>
  )
}

export default ListProduct