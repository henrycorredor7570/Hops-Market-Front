import "bootstrap/dist/css/bootstrap.min.css";
import ReviewCard from "../../ReviewList/ReviewCard/ReviewCard";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import style from "./ReviewManagment.module.css";
import Swal from "sweetalert2";

import {
  reviewProcessed,
  deleteReview,
  getReviewsUnreviewed,
  cleanReviews,
} from "../../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const selectReviewList = (state) => state.reviewList;

const getMemoizedReviewList = createSelector(
  [selectReviewList],
  (reviewList) => reviewList
);

const ReviewManagement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviewsUnreviewed());
    return () => {
      dispatch(cleanReviews());
    };
  }, [dispatch]);

  const reviews = useSelector(getMemoizedReviewList);

  const handleAcceptClick = (idRev) => {
    dispatch(reviewProcessed(idRev));
  };

  const handleDeleteClick = (idRev) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la revisión. ¿Estás seguro que deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario confirmó, procede con la eliminación
        dispatch(deleteReview(idRev));

        Swal.fire(
          "Eliminado",
          "La revisión ha sido eliminada con éxito.",
          "success"
        );
      }
    });
  };

  return reviews.length ? (
    <div className={style.mainContainer}>
      {reviews.map((review) => (
        <div className={style.processContainer} key={review.id}>
          <div className={style.buttons}>
            <button
              className={style.btn}
              onClick={() => handleAcceptClick(review.id)}
            >
              Aceptar
            </button>
            <button
              className={style.btn}
              onClick={() => handleDeleteClick(review.id)}
            >
              Eliminar
            </button>
          </div>
          <ReviewCard key={review.id} review={review} />
        </div>
      ))}
    </div>
  ) : (
    <div>No quedan reviews por porcesar!</div>
  );
};

export default ReviewManagement;
