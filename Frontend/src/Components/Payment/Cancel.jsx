import "./Cancel.css";

const Cancel = () => {
  return (
    <div className="cancel-container">
      <div className="cancel-card">
        <h2>⚠️ Payment Cancelled</h2>
        <p>Your payment was not completed.</p>
        <button onClick={() => window.location.href = "/cart"}>Go Back to Cart</button>
      </div>
    </div>
  );
};

export default Cancel;
