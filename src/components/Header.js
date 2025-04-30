import React from 'react';

function Header({ onShowAddForm, onGoHome }) {
  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="home-button"
          onClick={onGoHome}
        >
          Home
        </button>
        <h1>NovelNexus</h1>
      </div>
      <button className="add-button" onClick={onShowAddForm}>
        + Add New Book
      </button>
    </header>
  );
}

export default Header;