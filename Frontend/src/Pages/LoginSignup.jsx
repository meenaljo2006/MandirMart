import { useState } from "react"
import "./CSS/LoginSignup.css"
const LoginSignup = () => {

    const[state,setstate] =useState("Login");
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        email:"",
        role:""
    })

    const changeHandler = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})

    }

    const login = async()=>{
        console.log("Login Function Executed",formData);
        let responseData;
        await fetch("http://localhost:4000/login",{
            method:'POST',
            headers:{
                Accept:"application/form-data",
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        }).then((response)=>response.json()).then((data)=>responseData=data)

        if (responseData.success) {
            localStorage.setItem("auth-token", responseData.token);
            localStorage.setItem("user-role", responseData.role); // <-- store role

            if (responseData.role === "admin") {
                window.location.replace('http://localhost:5173/addproduct'); // redirect seller
            } else {
            window.location.replace('/'); // redirect buyer
            }
        } else{
            alert(responseData.errors);
        }


    }

    const signup = async() =>{
        console.log("Sign Up Function Executed",formData);
        let responseData;
        await fetch("http://localhost:4000/signup",{
            method:'POST',
            headers:{
                Accept:"application/form-data",
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        }).then((response)=>response.json()).then((data)=>responseData=data)

        if (responseData.success) {
            localStorage.setItem("auth-token", responseData.token);
            localStorage.setItem("user-role", responseData.role); // <-- store role

            if (responseData.role === "admin") {
                window.location.replace('http://localhost:5173/addproduct'); // redirect seller
            } else {
            window.location.replace('/'); // redirect buyer
            }
        }

    }

    return(
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state==="Sign Up"?<input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name"/>:<></>}
                    <input name="email" value={formData.email} onChange={changeHandler}  type="email" placeholder="Email Address"/>
                    <input name="password" value={formData.password} onChange={changeHandler}  type="password" placeholder="Password"/>
                    {state==="Sign Up"?<select name="role" value={formData.role} onChange={changeHandler} className="role">
                        <option value="buyer">Buyer</option>
                        <option value="admin">Seller</option>
                    </select>:<></>}
                </div>

                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id=""/>
                    <p>By continuing, i agree to the terms of use and privacy policy.</p>
                </div>

                <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
                {state==="Sign Up" ? <p className="loginsignup-login">Already have an account ? <span onClick={()=>{setstate("Login")}}>Login Here</span></p>:<p className="loginsignup-login">Create an account. <span onClick={()=>{setstate("Sign Up")}}>Click Here</span></p>}
                
                
                
            </div>

        </div>
    )

}

export default LoginSignup