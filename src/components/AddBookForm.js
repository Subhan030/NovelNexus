import React, { useState } from 'react';

function AddBookForm({ onAddBook }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    publishedYear: '',
    genre: '',
    pages: ''
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.genre.trim()) newErrors.genre = 'Genre is required';
    
    if (formData.publishedYear) {
      const year = parseInt(formData.publishedYear);
      if (isNaN(year) || year < 0 || year > new Date().getFullYear()) {
        newErrors.publishedYear = 'Please enter a valid year';
      }
    } else {
      newErrors.publishedYear = 'Publication year is required';
    }
    
    if (formData.pages) {
      const pages = parseInt(formData.pages);
      if (isNaN(pages) || pages <= 0) {
        newErrors.pages = 'Please enter a valid number of pages';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const processedData = {
        ...formData,
        publishedYear: parseInt(formData.publishedYear),
        pages: formData.pages ? parseInt(formData.pages) : null
      };
      onAddBook(processedData);
    }
  };

  return (
    <div className="add-book-form">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="author">Author*</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={errors.author ? 'error' : ''}
          />
          {errors.author && <span className="error-message">{errors.author}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description*</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
            rows="4"
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="genre">Genre*</label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className={errors.genre ? 'error' : ''}
            >
              <option value="">Select a genre</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-fiction">Non-fiction</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Thriller">Thriller</option>
              <option value="Horror">Horror</option>
              <option value="Biography">Biography</option>
              <option value="History">History</option>
              <option value="Self-help">Self-help</option>
              <option value="Other">Other</option>
            </select>
            {errors.genre && <span className="error-message">{errors.genre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="publishedYear">Published Year*</label>
            <input
              type="number"
              id="publishedYear"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              className={errors.publishedYear ? 'error' : ''}
              min="0"
              max={new Date().getFullYear()}
            />
            {errors.publishedYear && <span className="error-message">{errors.publishedYear}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="pages">Pages</label>
            <input
              type="number"
              id="pages"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              className={errors.pages ? 'error' : ''}
              min="1"
            />
            {errors.pages && <span className="error-message">{errors.pages}</span>}
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-button">Add Book</button>
        </div>
      </form>
    </div>
  );
}

export default AddBookForm;