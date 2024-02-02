import React, { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { useTimer } from "react-timer-hook";
import Counter from "./Counter"

function TimedCounter({ initialQuantity, stock, productId, loading, onQuantityChange }) {

  const [ quantity, setQuantity ] = useState(null)

  const { restart } = useTimer({ expiryTimestamp: createExpireDate(), onExpire, autoStart: false });

  function handleStartReset() {
    restart(createExpireDate());
  }

  function onExpire() {
    if (quantity == initialQuantity) {
        return
    }
    onQuantityChange(quantity)
  }

  function createExpireDate() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 2);
    return time
  }

  function handleQuantityChange(nq) {
    setQuantity(nq)
    handleStartReset()
  }

  function drawComponent() {
    if (loading) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )
    } else {
      return (
        <Counter 
        initialQuantity={initialQuantity}
        stock={stock} 
        productId={productId} 
        onQuantityChange={handleQuantityChange}
        />
      )
    }
  }

  return <>
    { drawComponent() }
  </>
}

export default TimedCounter;