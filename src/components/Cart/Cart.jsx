import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, getCartRequest } from "../../redux/actions/actions";
import styles from "./Cart.module.css";
import Return from "../Return/Return";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import MercadoPagoComponent from "./MercadoPagoButtom/Buttom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../../utils/UserUtils";
import Swal from "sweetalert2";
import CartRow from "./CartRow";

const Cart = () => {
  const dispatch = useDispatch();
  const syncing = useSelector((state) => state.cart.syncing);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const user = useSelector((e) => e.user);
  useEffect(() => {
    if (!user.postalCode && !user.city && !user.country) {
      Swal.fire({
        title: "Faltan datos!!",
        text: "Todavia no proporcionaste tus datos de envio!!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Completar datos",
      }).then((result) => {
        if (result.isConfirmed) {
          const id = user.id;
          navigate(`/profile/${id}`);
        } else {
          navigate("/");
        }
      });
    }
  }, []);
  console.log("este es el cart", cart);

  useEffect(() => {
    dispatch(getCartRequest());
    dispatch(getCart());
  }, []);

  const handleNavigate = () => {
    navigate("/");
  };
  if (cart.products) {
    return (
      <>
        <Navbar />
        <div className={styles.cartTitle}>
          <Return />
          <h1 className={styles.title}>Mi carrito</h1>
        </div>
        {syncing ? (
          <Loading />
        ) : (
          <div className={styles.cartContainer}>
            {/* Columna 1 */}
            <div className={styles.column}></div>

            {/* Columna 2 */}
            <div className={styles.column}>
              {/* Subtítulos en la segunda fila */}
              <div className={styles.subtitles}>
                <div className={styles.subtitleProduct}>Producto</div>
                <div className={styles.subtitlePrice}>Precio unitario</div>
                <div className={styles.subtitleQuantity}>Cantidad</div>
                <div className={styles.subtitle}></div>{" "}
                {/* Espacio para el botón de eliminar */}
              </div>

              {/* Lista de productos */}
              {(cart.products ?? []).map((product) => (
                <CartRow
                  key={product.id}
                  initialQuantity={cart.quantities[product.id]}
                  product={product}
                  syncing={syncing}
                />
              ))}
            </div>

            {/* Columna 3 */}
            <div className={styles.column}>
              <div className={styles.resume}>
                <div className={styles.subtotal}>
                  <div>Subtotal</div>
                  <div>$ {cart.total}</div>
                </div>
                <div className={styles.divider}></div>

                <div className={styles.total}>
                  <div>Total</div>
                  <div>$ {cart.total}</div>
                </div>
                <div className={styles.buttons}>
                  <Link to="/payment/start">
                    <MercadoPagoComponent total={cart.total} />
                  </Link>
                  <button onClick={handleNavigate} className={styles.btn}>
                    Elegir más productos
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <div className={styles.nocartContainer}>
          <h1>Actualmente no hay productos en el carrito</h1>
          <button onClick={handleNavigate} className={styles.button}>
            Ir a la tienda
          </button>
        </div>

        <Footer />
      </>
    );
  }
};

export default Cart;
