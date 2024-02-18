import React from "react";
import "./ViewBookCard.css";

const ViewBookCard = (props) => {
  const { bookId, name, author, genre, rating, addedBy } = props;

  return (
    <div className="view-book-card">
      <div className="book-name">
        <span className="txt-bold">{name}</span>
      </div>
      <div className="book-id">
        <span className="txt-bold">Book id:</span> {bookId}
      </div>
      <div className="author-name">
        <span className="txt-bold">Written by:</span> {author}
      </div>
      <div className="genre">
        <span className="txt-bold">Genre:</span> {genre}
      </div>
      <div className="lender-info">
        <div className="added-by-name">
          <span className="txt-bold">Added by:</span> {addedBy}
        </div>
        <div className="rating">
          <span className="txt-bold">Rating:</span> {rating}
        </div>
      </div>
    </div>
  );
};

export default ViewBookCard;
