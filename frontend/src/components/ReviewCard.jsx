export default function ReviewCard({ reviews }) {
  return (
    <>
      {reviews.length === 0
        ? "No reviews"
        : reviews.map((review) => (
            <div key={review.review_id} id="review-card">
              <h4>{review.guest}</h4>
              <p>
                <b>Rating: {review.rating}</b>
              </p>
              <p>{review.comment}</p>
              <p>{review.created_at}</p>
            </div>
          ))}
    </>
  );
}
