import { useState, useEffect } from "react";
import Loading from "../../Loading/Loading";
import HopPassionClient from "../../../utils/NetworkingUtils";
import styles from "./UserProfileOrders.module.css";
import UserReviews from "../UserReviews/UserReviews";
import UserOrderDetails from "../UserOrderDetails/UserOrderDetails";

const UserProfileOrder = ({
  id,
  status,
  createdAt,
  total,
  onOrderDetailsClick,
}) => {
  function mapStatusToStatus(status) {
    switch (status) {
      case "send":
        return "Confirmado";
      case "delivered":
        return "Entregado";
      default:
        return "";
    }
  }

  function mapCreatedAtToDate(createdAt) {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}   
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div className={styles.row}>
          <h2>Fecha del pedido:</h2>
          <h2 className={styles.totalSubtitle}>Total:</h2>
          <h2>Estado del pedido:</h2>
        </div>
        <div className={styles.row}>
          <p>{mapCreatedAtToDate(createdAt)}</p>
          <p>${total}</p>
          <p className={styles.status}>{mapStatusToStatus(status)}</p>
        </div>
        <div className={styles.row}></div>
        <h2>Número de orden:</h2>
        <div className={styles.row}>
          <p>{id}</p>
        </div>
      </div>
      <button onClick={onOrderDetailsClick}>Ver detalle del pedido</button>
    </div>
  );
};

const UserProfileOrders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState();

  useEffect(() => {
    getOrders();
  }, []);

  function handleReviewsClick() {
    setShowReviews(true);
  }

  function handleOrderDetailsClick(orderId) {
    setShowOrderDetails(true);
    setSelectedOrderId(orderId);
  }

  function handleBackToOrders() {
    setShowReviews(false);
    setShowOrderDetails(false);
  }

  async function getOrders() {
    setIsLoading(true);
    try {
      const response = await HopPassionClient.get("/orders");
      setOrders(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener las órdenes del usuario", error);
    }
  }

  function drawLoading() {
    return <Loading />;
  }

  function drawComponent() {
    if (isLoading) {
      return drawLoading();
    } else if (showReviews) {
      return <UserReviews onBackClick={handleBackToOrders} />;
    } else if (showOrderDetails) {
      return <UserOrderDetails onBackClick={handleBackToOrders} orderId={selectedOrderId}/>;
    } else {
      const totalOrders = orders.length;
      return (
        <div className={styles.mainContainer}>
          <h1>Mis compras</h1>
          <p className={styles.totalOrders}>{totalOrders} compras totales</p>
          <div className={styles.reviewsContainer}>
            Opina sobre tus productos comprados
            <button onClick={handleReviewsClick}>Calificar</button>
          </div>
          <div>
            {orders.map((order) => (
              <div className={styles.purchaseContainer} key={order.id}>
                <UserProfileOrder
                  id={order.id}
                  status={order.status}
                  createdAt={order.created_at}
                  total={order.total}
                  onOrderDetailsClick={() => handleOrderDetailsClick(order.id)}
                />
              </div>
            ))}
            {showOrderDetails && (
              <UserOrderDetails
                onBackClick={handleBackToOrders}
                orderId={selectedOrderId}
                userId={userId}
              />
            )}
          </div>
        </div>
      );
    }
  }

  return <>{drawComponent()}</>;
};

export default UserProfileOrders;
