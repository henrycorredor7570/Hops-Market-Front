import style from "./ReviewCard.module.css";
import StaticRating from "../../Rating/StaticRating";
import { useEffect, useState } from "react";
import HopPassionClient from "../../../utils/NetworkingUtils";

const ReviewCard = ({ review }) => {
  console.log(review);
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${month} - ${day} - ${year}`;
  };

  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await HopPassionClient.get(
          `/product/${review.ProductId}`
        );
        setData(data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const splitByBackticks = (str) => {
    if (str === null || str === undefined) {
      return ["", ""];
    }

    const firstBacktick = str.indexOf("`");
    if (firstBacktick === -1) {
      return ["", str];
    }

    const firstPart = str.slice(0, firstBacktick);
    const secondPart = str.slice(firstBacktick + 1).replace(/`/g, " ");

    return [firstPart, secondPart];
  };

  const commentData = splitByBackticks(review.comment);
  const title = data.name;
  const comment = commentData[1];

  return (
    <div className={style.mainContainer}>
      <div className={style.nameDate}>
        <div className={style.name}>
          {review.User?.user ? review.User?.user : review.User?.email}
        </div>
        <div className={style.date}>{formatDate(review.updatedAt)}</div>
      </div>
      <div className={style.starContainer}>
        <div className={style.stars}>
          <StaticRating
            score={review.rating}
            starSpacing={10}
            starDimension={17}
          />
        </div>
      </div>
      <div className={style.commentContainer}>
        {title ? <div className={style.name}>{title}</div> : <> </>}
        {comment ? (
          <div className={style.comment}>{comment}</div>
        ) : (
          <div className={style.noComment}>Actualmente sin comentarios.</div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
