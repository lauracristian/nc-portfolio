import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import AddReview from "./AddReview";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://airbnc-b4cu.onrender.com/api/properties/${id}/reviews`)
      .then(({ data }) => {
        setReviews(data.reviews);
      });
  }, [id]);

  return (
    <div id="review-container">
      <AddReview />
      <ReviewCard reviews={reviews} />
    </div>
  );
}
