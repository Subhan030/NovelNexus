import React from 'react';
import BookCard from './BookCard';

function BookList({ books, onSelectBook, selectedBookId }) {
  return (
    <div className="book-list">
      <h2>Book Collection</h2>
      {books.length === 0 ? (
        <p>No books in your collection yet.</p>
      ) : (
        books.map(book => (
          <BookCard 
            key={book.id}
            book={book}
            isSelected={book.id === selectedBookId}
            onClick={() => onSelectBook(book)}
          />
        ))
      )}
    </div>
  );
}

export default BookList;