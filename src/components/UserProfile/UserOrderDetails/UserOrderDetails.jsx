import { useState, useEffect } from "react";
import HopPassionClient from "../../../utils/NetworkingUtils";
import styles from "./UserOrderDetails.module.css";
import { ArrowLeft } from "react-bootstrap-icons";
import Loading from "../../Loading/Loading";
import { useParams } from "react-router-dom";

const UserOrderDetails = ({ orderId, onBackClick }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrdersDetails] = useState([]);

  async function getOrderDetails(orderId) {
    setIsLoading(true);
    try {
      const response = await HopPassionClient.get(`/orders/${orderId}`);
      setOrdersDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener el detalle de la órden", error);
    }
  }

  const fullDate = orderDetails.created_at;
  const dateObject = new Date(fullDate);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1; // Los meses se indexan desde 0, por lo que sumamos 1
  const year = dateObject.getFullYear();

  const formattedDate = `${day < 10 ? "0" : ""}${day}-${
    month < 10 ? "0" : ""
  }${month}-${year}`;

  function mapStatusToText(status) {
    switch (status) {
      case "send":
        return "Confirmado";
      default:
        return status;
    }
  }

  useEffect(() => {
    getOrderDetails(orderId);
  }, [orderId, id]);

  return (
    <div className={styles.header}>
      <ArrowLeft className={styles.backButton} onClick={onBackClick} />
      Mis compras
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.mainContainer}>
          <h1>Pedido</h1>
          <p className={styles.id}># {orderId}</p>
          <div className={styles.row}>
            <p>Fecha de creación: </p> <p>Estado de la orden:</p>
          </div>
          <div className={styles.rowDescription}>
            <p>{formattedDate}</p>{" "}
            <p className={styles.state}>
              {mapStatusToText(orderDetails.status)}
            </p>
          </div>
          <hr className={styles.line}></hr>
          <h2 className={styles.subtitle}>Dirección de envío:</h2>
          <div className={styles.row}>
            <p>Calle: </p> <p>Código Postal: </p>
          </div>
          <div className={styles.rowDescription}>
            <p> {orderDetails.address.street}</p>
            <p className={styles.postalCode}>
              {" "}
              {orderDetails.address.postal_code}
            </p>
          </div>
          <div className={styles.row}>
            <p>Ciudad:</p> <p>País:</p>
          </div>
          <div className={styles.rowDescription}>
            <p> {orderDetails.address.city}</p>
            <p className={styles.country}> {orderDetails.address.country}</p>
          </div>
          <hr className={styles.line}></hr>
          <h2 className={styles.subtitle}>Productos:</h2>
          <div>
            {orderDetails.products.map((product, index) => (
              <div key={index}>
                <div className={styles.row}>
                  <p>Nombre del producto:</p> <p>Cantidad:</p>
                </div>
                <div className={styles.rowDescription}>
                  <p>{product.name}</p>
                  <p className={styles.quantity}> {product.quantity}</p>
                </div>
                <div className={styles.row}>
                  <p>Precio unitario:</p> <p>Subtotal:</p>
                </div>
                <div className={styles.rowDescription}>
                  <p>${product.price}</p>{" "}
                  <p className={styles.subtotal}>${product.subtotal}</p>
                </div>
                <hr></hr>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrderDetails;
