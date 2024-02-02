import React, { useEffect, useState } from "react";
import style from "./Card.module.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

const CardP = ({ id, title, price, image, stock }) => {
  return (
    <div className={style.container}>
      <Card style={{ width: "255px", height: "450px", border: "none" }}>
        <div className={style.imageWrapper}>
          <Link to={`/product/${id}`} className={style.link}>
            <Card.Img variant="top" src={image} className={style.image} />
          </Link>
        </div>
        <Card.Body>
          <div className={style.infoWrapper}>
            <Card.Title>{title}</Card.Title>
            <div className={style.row}>
                <Card.Text className={style.customTextColor}>
                  ${price}
                </Card.Text>
            </div>
          </div>
        </Card.Body>
        <div className={style.addToCartContainer}>
          <AddToCartButton productId={id} stock={stock} />
        </div>
      </Card>
    </div>
  );
};

export default CardP;
