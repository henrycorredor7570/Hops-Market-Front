import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Details.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  getReviews,
  cleanReviews,
} from "../../redux/actions/actions";
import Footer from "../Footer/Footer";
import Return from "../Return/Return";
import Counter from "../Counter/Counter";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import ReviewList from "../ReviewList/ReviewList";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const quantities = useSelector((state) => state.cart.quantities);
  const [isLoading, setIsLoading] = useState(true);
  const [newQuantity, setNewQuantity] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      await dispatch(getProductById(id));
      setIsLoading(false);
    };

    if (user) {
      dispatch(getReviews(id, user.id));
    } else {
      dispatch(getReviews(id));
    }
    fetchProductDetails();
    return () => {
      dispatch(cleanReviews());
    };
  }, [dispatch, id]);

  function quantity() {
    return quantities[productDetails.id] ?? 0;
  }

  return (
    <div>
      <div className={styles.mainContainer}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.column}>
            <Return />
          </div>

          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <>
              <div className={styles.column}>
                <div className={styles.imageContainer}>
                  <img
                    src={productDetails.image}
                    className={styles.image}
                    alt={`${productDetails.id}`}
                  />
                </div>
                <p className={styles.description}>
                  {productDetails.description}
                </p>
              </div>

              <div className={styles.column}>
                <h1 className={styles.title}>{productDetails.name}</h1>
                <p className={styles.price}>$ {productDetails.price}</p>
                <p className={styles.quantity}>Cantidad: </p>

                <Counter
                  productId={productDetails.id}
                  initialQuantity={1}
                  stock={productDetails.stock}
                  onQuantityChange={(nq) => {
                    setNewQuantity(nq);
                  }}
                />

                <p className={styles.quantity}>
                  {productDetails.stock} unidades disponibles
                  {quantity() > 0
                    ? ", " + quantity() + " en el carrito."
                    : null}
                </p>

                <div className={styles.addToCartButtonContainer}>
                  <AddToCartButton
                    productId={productDetails.id}
                    stock={productDetails.stock}
                    quantity={newQuantity}
                  />
                </div>

                <div className={styles.box}>
                  <div className={styles.firstrow}>
                    <div className={styles.row}>
                      <h6 className={styles.subTitle}>Categoría:</h6>
                      <p className={styles.subTitle}>
                        {productDetails.categories.join(", ")}
                      </p>
                    </div>
                    <div className={styles.row}>
                      <h6 className={styles.subTitle}>País de Origen:</h6>
                      <p className={styles.subTitle}>
                        {productDetails.country}
                      </p>
                    </div>
                  </div>
                  <div className={styles.secondRow}>
                    <div className={styles.row}>
                      <h6 className={styles.subTitle}>
                        Graduación alcohólica:
                      </h6>
                      <p className={styles.subTitle}>
                        {productDetails.alcoholContent}%
                      </p>
                    </div>
                    <div className={styles.row}>
                      <h6 className={styles.subTitle}>Volumen:</h6>
                      <p className={styles.subTitle}>
                        {productDetails.amountMl} ml.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <ReviewList isLoading={isLoading} />
      <Footer />
    </div>
  );
};

export default Details;
