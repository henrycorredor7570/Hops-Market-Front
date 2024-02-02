import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Counter.module.css";
import { useSelector } from "react-redux";
import { Dash, Plus } from "react-bootstrap-icons";

function Counter({ initialQuantity, stock, productId, onQuantityChange }) {
  const quantityOnCart = useSelector((state) => state.cart.quantities[productId] ?? 0)
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    updateQuantity(initialQuantity)
  }, [quantityOnCart])

  const incrementQuantity = () => {
    if (canIncrement()) {
      updateQuantity(quantity + 1)
    }
  };

  const decrementQuantity = () => {
    if (canDecrement()) {
      updateQuantity(quantity - 1)
    }
  };

  function updateQuantity(nq) {
    setQuantity(nq)
    onQuantityChange(nq)
  }

  function canIncrement() {
    return quantity < (stock - quantityOnCart)
  }

  function canDecrement() {
    return quantity > 1
  }

  return (
    <div className={styles.counter_buttons__container}>
      <div className={styles.counter_buttons__content}>
        <button 
        className={styles.counter_buttons__button} 
        disabled={!canDecrement()}
        onClick={decrementQuantity}>
          <Dash />
        </button>
        <div className={styles.counter_buttons__text}>
          { quantity }
        </div>
        <button 
        className={styles.counter_buttons__button}
        disabled={!canIncrement()}
        onClick={incrementQuantity}>
          <Plus />
        </button>
      </div>
    </div>
  );
}

Counter.propTypes = {
  initialQuantity: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

export default Counter;
