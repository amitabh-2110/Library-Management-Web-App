import React from 'react'
import { useNavigate } from 'react-router-dom';
import bookImage from '../../assets/book.jpg'
import './BookCard.css';

const BookCard = (props) => {
  const { bookId, bookName, rating, author } = props;
  const navigate = useNavigate();

  return (
    <div className="book-card">
      <img src={bookImage} alt="book" className="img-container" />
      <div className="info-container">
        <div className="info">
          <h2 className="book-name-info">{bookName}</h2>
          <div className="author-info">By <i>{author}</i></div>
        </div>
        <div className="book-info">
          <div className="rating-info">Rating: {rating}</div>
          <button onClick={() => navigate(`/book/${bookId}`)} className="view-btn">
            view book
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookCard