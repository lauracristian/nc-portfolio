import { useState } from "react";
import { useParams } from "react-router-dom";

export default function AddReview() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { id } = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    const newReview = {};

    newReview.property_id = id;
    newReview.rating = +rating;
    newReview.comment = comment;
  }

  return (
    <>
      <h3>Add Review</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="review-rating">Rating</label>
        <input
          id="rating"
          type="number"
          min="1"
          max="5"
          onChange={(e) => setRating(e.target.value)}
        />

        <label htmlFor="review-comment">Write Review</label>
        <textarea
          id="review-comment"
          onChange={(e) => setComment(e.target.value)}
        />

        <button>Add</button>
      </form>
    </>
  );
}
