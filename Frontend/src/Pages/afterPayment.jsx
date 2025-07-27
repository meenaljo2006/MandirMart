import Navbar from "../Components/Navbar/Navbar";
import Success from "../Components/Payment/Success";
import Cancel from "../Components/Payment/Cancel";

import { useSearchParams } from "react-router-dom";

const AfterPayment = () => {
  const [params] = useSearchParams();
  const status = params.get("status");

  return (
    <div>
      
      {status === "success" ? <Success /> : <Cancel />}
    </div>
  );
};

export default AfterPayment;
