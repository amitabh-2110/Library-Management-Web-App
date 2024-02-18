import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setCoins } from '../../features/userAuth/userAuthSlice';
import toast from 'react-hot-toast';
import { baseUrl } from '../../assets/baseUrl';
import bookImage from '../../assets/book.jpg';
import './BookPage.css';

const BookPage = () => {
  const [bookInfo, setBookInfo] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const { token, email, coins } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  const bookId = location.pathname.split('/').at(-1);
  
  const fetchBook = async () => {
    try {
      const res = await fetch(`${baseUrl}/Book/fetch-book?bookId=${bookId}`);
      const data = await res.json();
      console.log(data);
      if(data.statusCode === 200) {
        setBookInfo(data.book);
      }
    } catch(error) {
      console.log("error in fetching book by id");
    }
  }

  const borrowBook = async () => {
    const borrowInfo = {
      bookId: bookId,
      lender: bookInfo.addedBy,
      borrower: email
    };

    if(coins === 0) {
      toast.error("sorry, you don't have enough coins. Add some books and try again later!!");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/User/borrow-book`, {
        method: "POST",
        body: JSON.stringify(borrowInfo),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      console.log(data);
      if(data.statusCode === 200) {
        dispatch(setCoins(coins-1));
        toast.success("Book borrowed successfully");
        navigate("/");
      }

    } catch(error) {
      console.log("error in borrowing book ", error);
    }
  }

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <div className="book-page">
      <div className="book-info-container">
        <img src={bookImage} alt="book" className="image-container" />

        <div className="book-page-container">
          <div className="book-name">{bookInfo.name}</div>
          <div className="book-author">Written by: {bookInfo.author}</div>
          <div className="book-creater">Added by: {bookInfo.addedBy}</div>
          <div className="book-genre">Genre: {bookInfo.genre}</div>

          {token !== null && bookInfo.addedBy !== email && (
            <button className="borrow-btn" onClick={borrowBook}>
              Borrow book
            </button>
          )}
        </div>
      </div>

      <div className="book-desc-container">
        <span className="txt-bold">About book</span>
        <div className="book-desc">
          {bookInfo.description}
        </div>
      </div>
    </div>
  )
}

export default BookPage