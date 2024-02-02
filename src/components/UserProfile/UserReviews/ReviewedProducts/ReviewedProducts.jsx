import styles from "./ReviewedProducts.module.css";
import React, { useState, useEffect } from "react";
import HopPassionClient from "../../../../utils/NetworkingUtils";
import { useParams } from "react-router-dom";
import { Star, StarFill } from "react-bootstrap-icons";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function ReviewedProducts() {
  const [reviewedProducts, setReviewedProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const fetchReviewedProducts = async () => {
    try {
      const response = await HopPassionClient.get(`/product/qualified/${id}`);
      setReviewedProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener productos reseñados", error);
      setIsLoading(false);
    }
  };
  console.log(reviewedProducts);

  function calculateAverageRating(reviews) {
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce(
      (total, review) => total + review.rating,
      0
    );
    return totalRating / reviews.length;
  }

  useEffect(() => {
    fetchReviewedProducts();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status" />
      ) : (
        reviewedProducts.map((product) => (
          <div key={product.id} className={styles.product}>
            <Link className={styles.link} to={`/product/${product.id}`}>
              <div className={styles.productHeader}>
                <h2 className={styles.productName}>{product.name}</h2>
                <div className={styles.rating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>
                      {star <= calculateAverageRating(product.Reviews) ? (
                        <StarFill className={styles.starFill} />
                      ) : (
                        <Star className={styles.starOutline} />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
            {product.Reviews.map((review, index) => (
              <div key={index} className={styles.reviewItem}>
                <p className={styles.productReview}>{review.comment}</p>
              </div>
            ))}
            <hr></hr>
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewedProducts;
