import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import style from "./AddToCartButton.module.css";
import { CartPlus } from "react-bootstrap-icons";
import { addToCart } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddToCartButton = ({ productId, stock, quantity = 1 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const cartSyncing = useSelector((state) => state.cart.syncing);
  const quantities = useSelector((state) => state.cart.quantities);
  const user = useSelector((state) => state.user);

  function existingQuantity() {
    return quantities[productId] ?? 0;
  }

  const handleAddToCart = () => {
    if (user == null) {
      Swal.fire({
        title: "No estas logueado!",
        text: "Para continuar con la compra debes crearte una cuenta o loguearte",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, loguearme!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      setIsAdding(true);
      dispatch(
        addToCart(productId, existingQuantity() + quantity, (result) => {
          setIsAdding(false);
        })
      );
      Swal.fire({
        icon: "success",
        title: "Producto agregado exitosamente!",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const isLoading = () => {
    return isAdding || (cartSyncing && user != null);
  };

  function componentContent() {
    if (user && user.role == "admin") {
      return null
    }

    return <button
            className={style.button}
            onClick={() => handleAddToCart()}
            disabled={existingQuantity() >= stock || isLoading()}>
            {buttonContent()}
          </button>
  }

  function buttonContent() {
    if (isLoading()) {
      return <Spinner animation="border" role="status"></Spinner>;
    } else if (existingQuantity() >= stock) {
      return "Stock agotado";
    } else {
      return (
        <>
          <CartPlus /> Agregar
        </>
      );
    }
  }

  return (
    <>
      { componentContent() }
    </>
  );
};

export default AddToCartButton;
