import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";
import styles from "./Return.module.css";

const Return = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <button className={styles.return} onClick={handleGoBack}>
      <ArrowLeft className={styles.iconStyle} />
    </button>
  );
};

export default Return;
