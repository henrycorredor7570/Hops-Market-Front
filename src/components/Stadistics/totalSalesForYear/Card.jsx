import { useEffect, useState } from "react";
import "./Card.css";
import axios from "axios";

export default function CardTotalAmount() {
  const [total, setTotal] = useState();
  useEffect(() => {
    const getInfoChart = async () => {
      try {
        const cardTotal1 = await axios.get(
          "https://hoppassion-server.1.ie-1.fl0.io/stadistics/historixalTotalSales"
        );
        setTotal(cardTotal1.data.data);
      } catch (error) {
        throw error;
      }
    };
    getInfoChart();
  }, []);
  console.log("card Total,", total);

  return (
    <div className="containerCard">
      <img
        src="https://res.cloudinary.com/dkwvnp3ut/image/upload/v1697244833/pila-de-billetes-de-dolar_bez69k.png"
        alt="Dolar"
      />
      <div className="container_strings">
        <span className="amount">$| {total}</span>
        <span className="span_generic">Total de ventas</span>
      </div>
    </div>
  );
}
