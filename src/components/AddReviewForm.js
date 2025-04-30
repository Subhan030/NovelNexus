import React, { useState } from 'react';

function AddReviewForm({ onAddReview, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    text: ''
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.text.trim()) newErrors.text = 'Review text is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddReview(formData);
    }
  };

  return (
    <div className="add-review-form">
      <h3>Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating*</label>
          <div className="rating-input">
            {[5, 4, 3, 2, 1].map(value => (
              <label key={value} className="rating-label">
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  checked={formData.rating === value}
                  onChange={handleChange}
                />
                {value} <span>{value === 1 ? '★' : '★'.repeat(value)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="text">Your Review*</label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            className={errors.text ? 'error' : ''}
            rows="4"
          />
          {errors.text && <span className="error-message">{errors.text}</span>}
        </div>

        <div className="form-buttons">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;