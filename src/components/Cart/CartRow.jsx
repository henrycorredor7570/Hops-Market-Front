import React, { useState } from "react";
import {
  removeFromCart,
  addToCart,
} from "../../redux/actions/actions";
import styles from "./Cart.module.css";
import TimedCounter from "../Counter/TimedCounter";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function CartRow({ product, initialQuantity, syncing }) {

    const dispatch = useDispatch();

    const [ isUpdating, setIsUpdating ] = useState(false)
    const [ isDeleting, setIsDeleting ] = useState(false)

    function isLoading() {
        return isDeleting || isUpdating || syncing
    }

    function handleRemoveFromCart() {
        setIsDeleting(true)
        dispatch(removeFromCart(product.id, (result) => {
            setIsDeleting(false)
        }));
    };

    function handleQuantityChange(newQuantity) {
        setIsUpdating(true)
        dispatch(addToCart(product.id, newQuantity, (result) => {
          setIsUpdating(false)
        }))
    }

    function deleteButtonContent() {
        if (isLoading()) {
          return <Spinner animation="border" role="status"></Spinner>;
        } else {
          return "Eliminar";
        }
    }

    return (
        <div key={product.id} className={styles.cartItem}>
            <div className={styles.productGroup}>
                <Link to={`/product/${product.id}`}>
                    <img
                    src={product.image}
                    className={styles.cartItemImage}
                    alt={`${product.id}`}
                    />
                    <div className={styles.cartItemName}>{product.name}</div>
                </Link>
            </div>
            <p className={styles.cartItemPrice}>$ {product.price}</p>
            <TimedCounter
            initialQuantity={initialQuantity}
            productId={product.id}
            stock={product.stock}
            loading={isLoading()}
            onQuantityChange={(nq) => handleQuantityChange(nq)}
            />
            <button
                className={styles.cartItemButton}
                disabled={isLoading()}
                onClick={() => handleRemoveFromCart()}
            >
                { deleteButtonContent() }
            </button>
        </div>
    )
}

export default CartRow;