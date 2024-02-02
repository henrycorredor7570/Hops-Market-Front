import style from "./ReviewList.module.css";
import ReviewCard from "./ReviewCard/ReviewCard";
import StaticRating from "../Rating/StaticRating";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

// Selector para obtener la lista de reseñas desde el estado
const selectReviewList = (state) => state.reviewList;

// Selector memoizado para mejorar el rendimiento
const getMemoizedReviewList = createSelector(
  [selectReviewList],
  (reviewList) => reviewList
);

const ReviewList = ({ isLoading }) => {
  const rev = useSelector(getMemoizedReviewList);

  const calcularPromedioRating = (reviews) => {
    if (reviews.length === 0) {
      return 0;
    }
    const totalRatings = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const promedio = totalRatings / reviews.length;
    return Math.round(promedio * 10) / 10;
  };

  const promedio = calcularPromedioRating(rev);

  let signo;
  if (rev.length) {
    signo = "!";
  } else {
    signo = "?";
  }

  return (
    !isLoading && (
      <div className={style.mainContainer}>
        <div name="title" className={style.title}>
          {`Opiniones de Nuestros Clientes${signo}`}
        </div>
        {rev.length === 0 ? (
          <div className={style.noReviewsYet}>Aún no hay opiniones.</div>
        ) : (
          <div>
            <div className={style.totalRating}>
              <div className={style.totalStar}>
                <StaticRating
                  score={promedio}
                  starDimension={23}
                  starSpacing={0.1}
                />
              </div>
              <div className={style.outOf}>{`${promedio} de 5 estrellas`}</div>
            </div>
            <div className={style.totalReviews}>{rev.length} opiniones</div>
            <div className={style.listContainer}>
              {rev.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default ReviewList;
