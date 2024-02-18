import React, { useEffect, useState } from "react";
import { baseUrl } from "../../assets/baseUrl";
import { useSelector } from "react-redux";
import ViewBookCard from "../viewBookCard/ViewBookCard";
import './AddedBooks.css';

const AddedBooks = () => {
  const [addedBooks, setAddedBooks] = useState([]);

  const { token, username, email } = useSelector((state) => state.userAuth);

  const fetchAddedBooks = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/User/fetch-added-books?username=${email}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (data.statusCode === 200) setAddedBooks(data.books);
    } catch (error) {
      console.log(`error in fetching added books `, error);
    }
  };

  useEffect(() => {
    fetchAddedBooks();
  }, []);

  return (
    <div className="added-books">
      <h1> Books added by {username} </h1>
      <div className="added-books-container">
        {addedBooks.length === 0 ? (
          <div className="book-not-found">No books found !!</div>
        ) : (
          <div className="books-container">
            {addedBooks.map((book) => (
              <ViewBookCard key={book.bookId} {...book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddedBooks;
