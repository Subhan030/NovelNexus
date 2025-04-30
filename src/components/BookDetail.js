import React, { useState } from 'react';
import StarRating from './StarRating';
import ReviewList from './ReviewList';
import AddReviewForm from './AddReviewForm';

function BookDetail({ book, onAddReview, onDeleteBook }) {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleAddReview = (review) => {
    onAddReview(book.id, review);
    setShowReviewForm(false);
  };

  return (
    <div className="book-detail">
      <div className="book-detail-header">
        <div>
          <h2>{book.title}</h2>
          <p className="book-author">by {book.author}</p>
          <div className="book-rating">
            <StarRating rating={book.averageRating} size="large" />
            <span className="rating-text">
              {book.averageRating.toFixed(1)} ({book.reviews.length} review{book.reviews.length !== 1 ? 's' : ''})
            </span>
          </div>
        </div>
        <button 
          className="delete-button" 
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this book?')) {
              onDeleteBook(book.id);
            }
          }}
        >
          Delete Book
        </button>
      </div>

      <div className="book-info">
        <div className="book-description">
          <h3>Description</h3>
          <p>{book.description}</p>
        </div>
        <div className="book-metadata">
          <div className="metadata-item">
            <span className="label">Genre:</span>
            <span>{book.genre}</span>
          </div>
          <div className="metadata-item">
            <span className="label">Published:</span>
            <span>{book.publishedYear}</span>
          </div>
          {book.pages && (
            <div className="metadata-item">
              <span className="label">Pages:</span>
              <span>{book.pages}</span>
            </div>
          )}
        </div>
      </div>

      <div className="reviews-section">
        <div className="reviews-header">
          <h3>Reviews</h3>
          {!showReviewForm && (
            <button 
              className="add-review-button"
              onClick={() => setShowReviewForm(true)}
            >
              + Add Review
            </button>
          )}
        </div>
        
        {showReviewForm ? (
          <AddReviewForm 
            onAddReview={handleAddReview} 
            onCancel={() => setShowReviewForm(false)}
          />
        ) : (
          <ReviewList reviews={book.reviews} />
        )}
      </div>
    </div>
  );
}
export default BookDetail;