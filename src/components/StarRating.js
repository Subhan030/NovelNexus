import React from 'react';

function StarRating({ rating, size = 'small' }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<span key={i} className={`star full-star ${size}`}>★</span>);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<span key={i} className={`star half-star ${size}`}>★</span>);
    } else {
      stars.push(<span key={i} className={`star empty-star ${size}`}>☆</span>);
    }
  }
  
  return <div className="star-rating">{stars}</div>;
}

export default StarRating;
