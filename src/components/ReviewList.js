import React from 'react';
import StarRating from './StarRating';

function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return <p>No reviews yet. Be the first to review this book!</p>;
  }

  return (
    <div className="review-list">
      {reviews.map(review => (
        <div key={review.id} className="review-item">
          <div className="review-header">
            <div className="reviewer-info">
              <h4>{review.name}</h4>
              <p className="review-date">
                {new Date(review.id).toLocaleDateString()}
              </p>
            </div>
            <StarRating rating={review.rating} />
          </div>
          <p className="review-text">{review.text}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;