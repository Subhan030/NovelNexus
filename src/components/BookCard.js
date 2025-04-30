import React from 'react';
import StarRating from './StarRating';

function BookCard({ book, isSelected, onClick }) {
  return (
    <div 
      className={`book-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <h3>{book.title}</h3>
      <p className="author">by {book.author}</p>
      <div className="book-card-rating">
        <StarRating rating={book.averageRating} /> 
        <span className="review-count">
          ({book.reviews.length} review{book.reviews.length !== 1 ? 's' : ''})
        </span>
      </div>
    </div>
  );
}

export default BookCard;