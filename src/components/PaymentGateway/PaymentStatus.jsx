import { StatusScreen } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function StatusPayment(props) {
  const navigate = useNavigate();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useSelector((state) => state.user)
  const [navigateToHome, setNavigateToHome] = useState(false);
  
  const initialization = {
    paymentId: searchParams.get("payment_id"),
  };

  useEffect(() => {
    if (navigateToHome) {
      navigate(`/profile/${user.id}?tab=orders`);
    }
  }, [navigateToHome]);

  const onError = async (error) => {
    console.log(error);
    setTimeout(() => {
      setNavigateToHome(true);
    }, 3000);
  };

  const onReady = async () => {
    setTimeout(() => {
      setNavigateToHome(true);
    }, 5000);
  };

  return (
    <StatusScreen
      locale="es-AR"
      initialization={initialization}
      onReady={onReady}
      onError={onError}
    />
  );
}
