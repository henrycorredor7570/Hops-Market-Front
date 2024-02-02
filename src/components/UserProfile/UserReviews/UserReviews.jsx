import styles from "./UserReviews.module.css";
import { ArrowLeft } from "react-bootstrap-icons";
import React, { useState } from "react";
import PendingReviews from "./PendingReviews/PendingReviews";
import ReviewedProducts from "./ReviewedProducts/ReviewedProducts";

const UserReviews = ({ onBackClick }) => {
  const [activeTab, setActiveTab] = useState("pending");

  const switchToPendingTab = () => {
    setActiveTab("pending");
  };

  const switchToReviewedTab = () => {
    setActiveTab("reviewed");
  };

  return (
    <>
      <div className={styles.header}>
        <ArrowLeft className={styles.backButton} onClick={onBackClick} />
        Mis compras
      </div>
      <h1 className={styles.title}>Calificaciones</h1>

      <div className={styles.mainContainer}>
        <div className={styles.tabs}>
          <button
            onClick={switchToPendingTab}
            className={activeTab === "pending" ? styles.activeTab : ""}
          >
            Pendientes
          </button>
          <button
            onClick={switchToReviewedTab}
            className={activeTab === "reviewed" ? styles.activeTab : ""}
          >
            Reseñados
          </button>
        </div>

        <div className={styles.container}>
          {activeTab === "pending" ? <PendingReviews /> : <ReviewedProducts />}
        </div>
      </div>
    </>
  );
};

export default UserReviews;
