import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import AddBookForm from './components/AddBookForm';
import SearchBar from './components/SearchBar';
import { initialBooks } from './data/books';

function App() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : initialBooks;
  });
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [popularBooks, setPopularBooks] = useState([]);
  const [isLoadingPopular, setIsLoadingPopular] = useState(true);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        // Fetch 21 popular books from different categories
        const categories = ['bestseller', 'fiction', 'non-fiction', 'romance', 'mystery', 'science-fiction'];
        const allBooks = [];
        
        for (const category of categories) {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=4`
          );
          const data = await response.json();
          
          if (data.items) {
            const formattedBooks = data.items.map(item => ({
              id: item.id,
              title: item.volumeInfo.title,
              author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Unknown Author',
              description: item.volumeInfo.description || 'No description available',
              imageUrl: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
              publishedYear: item.volumeInfo.publishedDate ? new Date(item.volumeInfo.publishedDate).getFullYear() : 'N/A',
              genre: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'Unknown Genre',
              pages: item.volumeInfo.pageCount || 'N/A',
              reviews: [],
              averageRating: 0
            }));
            allBooks.push(...formattedBooks);
          }
        }

        // Remove duplicates based on book ID
        const uniqueBooks = Array.from(new Map(allBooks.map(book => [book.id, book])).values());
        
        // Get 22 books instead of 20
        const selectedBooks = uniqueBooks.slice(0, 22);
        
        // Replace the first two books with different ones
        const firstTwoReplacementResponse = await fetch(
          'https://www.googleapis.com/books/v1/volumes?q=subject:classic&maxResults=2'
        );
        const firstTwoReplacementData = await firstTwoReplacementResponse.json();
        
        if (firstTwoReplacementData.items) {
          const replacementBooks = firstTwoReplacementData.items.map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Unknown Author',
            description: item.volumeInfo.description || 'No description available',
            imageUrl: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
            publishedYear: item.volumeInfo.publishedDate ? new Date(item.volumeInfo.publishedDate).getFullYear() : 'N/A',
            genre: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'Unknown Genre',
            pages: item.volumeInfo.pageCount || 'N/A',
            reviews: [],
            averageRating: 0
          }));
          
          // Replace the first two books with the new ones
          selectedBooks.splice(0, 2, ...replacementBooks);
        }
        
        setPopularBooks(selectedBooks);
      } catch (error) {
        console.error('Error fetching popular books:', error);
      } finally {
        setIsLoadingPopular(false);
      }
    };

    fetchPopularBooks();
  }, []);

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setShowAddForm(false);
    setSearchResults([]);
  };

  const handleAddBook = (newBook) => {
    const bookWithId = {
      ...newBook,
      id: Date.now(),
      reviews: [],
      averageRating: 0
    };
    setBooks([...books, bookWithId]);
    setShowAddForm(false);
  };

  const handleAddReview = (bookId, review) => {
    const updatedBooks = books.map(book => {
      if (book.id === bookId) {
        const newReviews = [...book.reviews, { ...review, id: Date.now() }];
        const totalRating = newReviews.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = totalRating / newReviews.length;
        
        const updatedBook = {
          ...book,
          reviews: newReviews,
          averageRating
        };
        
        setSelectedBook(updatedBook);
        return updatedBook;
      }
      return book;
    });
    
    setBooks(updatedBooks);
  };

  const handleDeleteBook = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId));
    setSelectedBook(null);
  };

  const handleSearch = async (searchTerm) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&maxResults=10`
      );
      const data = await response.json();
      
      if (data.items) {
        const formattedResults = data.items.map(item => ({
          id: item.id,
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Unknown Author',
          description: item.volumeInfo.description || 'No description available',
          imageUrl: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
          publishedYear: item.volumeInfo.publishedDate ? new Date(item.volumeInfo.publishedDate).getFullYear() : 'N/A',
          genre: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'Unknown Genre',
          pages: item.volumeInfo.pageCount || 'N/A',
          reviews: [],
          averageRating: 0
        }));
        setSearchResults(formattedResults);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const handleAddSearchResult = (book) => {
    const bookWithId = {
      ...book,
      id: Date.now(),
    };
    setBooks([...books, bookWithId]);
    setSearchResults(searchResults.filter(b => b.id !== book.id));
  };

  const handleSelectSearchResult = (book) => {
    setSelectedBook(book);
    setShowAddForm(false);
  };

  const handleAddPopularBook = (book) => {
    const bookWithId = {
      ...book,
      id: Date.now(),
    };
    setBooks([...books, bookWithId]);
    setPopularBooks(popularBooks.filter(b => b.id !== book.id));
  };

  const renderContent = () => {
    if (isSearching) {
      return <div className="loading">Searching...</div>;
    }

    if (selectedBook) {
      return (
        <BookDetail 
          book={selectedBook} 
          onAddReview={handleAddReview}
          onDeleteBook={handleDeleteBook}
        />
      );
    }

    if (searchResults.length > 0) {
      return (
        <div className="search-results">
          <h2>Search Results</h2>
          <div className="search-results-grid">
            {searchResults.map(book => (
              <div 
                key={book.id} 
                className="search-result-item"
                onClick={() => handleSelectSearchResult(book)}
              >
                <img src={book.imageUrl} alt={book.title} />
                <h3>{book.title}</h3>
                <p>By {book.author}</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddSearchResult(book);
                  }}
                  className="add-to-library-btn"
                >
                  Add to Library
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (showAddForm) {
      return <AddBookForm onAddBook={handleAddBook} />;
    }

    return (
      <div className="welcome-section">
        <div className="welcome-message">
          <h2>Welcome to NovelNexus!</h2>
          <p>Select a book from the list or add a new book to get started.</p>
        </div>
        
        <div className="popular-books-section">
          <h2>Popular Books</h2>
          {isLoadingPopular ? (
            <div className="loading">Loading popular books...</div>
          ) : (
            <div className="popular-books-grid">
              {popularBooks.map(book => (
                <div 
                  key={book.id} 
                  className="popular-book-item"
                  onClick={() => handleSelectSearchResult(book)}
                >
                  <img src={book.imageUrl} alt={book.title} />
                  <h3>{book.title}</h3>
                  <p>By {book.author}</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddPopularBook(book);
                    }}
                    className="add-to-library-btn"
                  >
                    Add to Library
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <Header 
        onShowAddForm={() => {
          setShowAddForm(true);
          setSelectedBook(null);
        }}
        onGoHome={() => {
          setSelectedBook(null);
          setShowAddForm(false);
          setSearchResults([]);
        }}
      />
      <SearchBar onSearch={handleSearch} />
      <div className="main-content">
        <BookList 
          books={books} 
          onSelectBook={handleSelectBook}
          selectedBookId={selectedBook ? selectedBook.id : null}
        />
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;