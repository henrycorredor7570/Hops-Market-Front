import { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import Spinner from 'react-bootstrap/Spinner';
import styles from "./PaymentGateway.module.css"
import { getCart, getCartRequest } from "../../redux/actions/actions";
import HopPassionClient from "../../utils/NetworkingUtils";
import { useNavigate } from "react-router-dom";


initMercadoPago("TEST-f3d5c7f4-e6c2-4b81-a665-275a86d19bfd");

const CardPaymentWrapper = memo((props) => {
  return <CardPayment
    locale="es-AR"
    initialization={{
      amount: props.total,
      payer: {
        email: props.payerEmail
      }
    }}
    customization={{
      visual: {
        hidePaymentButton: true
      },
      paymentMethods: {
        maxInstallments: 1
      }
    }}
    onReady={props.onReady}
    onSubmit={props.onSubmit}
    onError={props.onError}
  />
}, (prev, next) => {
  return prev.total == next.total
})

const MPPayButton = ({total, loading, handlePayButton}) => {
  return <>
    <button className={styles.payButton} onClick={handlePayButton} disabled={loading}>
        {
          loading ? (
            <Spinner animation="border" role="status" className={styles.loading}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <div style={{margin: '0 auto'}}>Pagar ${total}</div>
          )
        }
    </button>
  </>
}

const PaymentGateway = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.user)
  const syncing = useSelector((state) => state.cart.syncing);
  const cart = useSelector((state) => state.cart);

  const [ isMPReady, setIsMPReady ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    reloadCart()
  }, []);

  function reloadCart() {
    dispatch(getCartRequest());
    dispatch(getCart());
  }

  function drawPaymentComponent() {
    if (syncing || !cart.total) {
      return <Loading />
    } else {
      return (
        <div>
          <CardPaymentWrapper
            total={cart.total}
            payerEmail={user.email}
            onReady={onReady}
            onError={onError}
          />
          { isMPReady 
          ? <MPPayButton total={cart.total} loading={isLoading} handlePayButton={handlePayButton} />
          : <></> }
        </div>
      )
    }
  }

  const onError = async (error) => {
    console.log(error);
  };

  const onReady = async () => {
    setIsMPReady(true)
  }

  async function handlePayButton() {
    setIsLoading(true)
    try {
      const data = await window.cardPaymentBrickController.getFormData()
      const filterIdProducts = cart.products.map(e => e.id);
      const response = await HopPassionClient.post("/pay/process_payment", data);
      reloadCart()
      HopPassionClient.post("/buy/createBuy", {
        amount: cart.total,
        payment_id: user.id,
        userId: user.id ,
        productId: filterIdProducts,
      })
      navigate('/payment/result?payment_id=' + response.data.payment_id);
      setIsLoading(false)
    } catch(error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  return (
    <>
      <Navbar />
      { drawPaymentComponent() }
      <Footer />
    </>
  );
};

export default PaymentGateway;