import StarRatings from "react-star-ratings";
import style from "./Rating.module.css";

export default function StaticRating(props) {
  const { score, starSpacing, starDimension } = props;
  return (
    <div className={style.mainContainer}>
      <StarRatings
        rating={score}
        starDimension={`${starDimension}px`}
        starSpacing={`${starSpacing}px`}
        starRatedColor="#97a663"
      />
    </div>
  );
}
