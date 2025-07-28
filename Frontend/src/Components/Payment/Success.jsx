import { useEffect } from "react";
import "./Success.css"

const Success = () => {

  useEffect(() => {
    fetch("https://mandirmart.onrender.com/clearcart", {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    }).then((res) => res.json())
      .then((data) => {
        console.log("🛒 Cart cleared:", data);
      });
  }, []);

  return (
    <div className="success-container">
      <div className="success-card">
        <h2>💸 Payment Successful</h2>
        <p>Thank you for your payment!</p>
        <button onClick={() => window.location.href = "/"}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default Success;
