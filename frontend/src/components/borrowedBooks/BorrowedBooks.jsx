import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../assets/baseUrl";
import ViewBookCard from "../viewBookCard/ViewBookCard";
import './BorrowedBooks.css';

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const { token, username, email } = useSelector((state) => state.userAuth);

  const fetchBorrowedBooks = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/User/fetch-borrowed-books?username=${email}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (data.statusCode === 200) setBorrowedBooks(data.books);
    } catch (error) {
      console.log("error in fetching borrowed books ", error);
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  return (
    <div className="borrowed-books">
      <h1>Borrowed books by {username}</h1>
      <div className="borrowed-books-container">
        {borrowedBooks.length === 0 ? (
          <div className="book-not-found">No books found !!</div>
        ) : (
          <div className="books-container">
            {borrowedBooks.map((book) => (
              <ViewBookCard key={book.bookId} {...book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowedBooks;
