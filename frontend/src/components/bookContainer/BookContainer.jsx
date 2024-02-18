import React from "react";
import BookCard from "../bookCard/BookCard";
import "./BookContainer.css";

const BookContainer = (props) => {
  const { books } = props;

  return (
    <div className="book-container">
      {books.length === 0 ? (
        <h1 className="book-loader">Loading ...</h1>
      ) : (
        <div className="books">
          {books
            .filter((book) => book.isBookAvailable)
            .map((book) => (
              <BookCard
                key={book.bookId}
                bookId={book.bookId}
                bookName={book.name}
                rating={book.rating}
                author={book.author}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default BookContainer;
