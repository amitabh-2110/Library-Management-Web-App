import React, { useEffect, useState } from "react";
import SearchFilter from "../searchFilter/SearchFilter";
import BookContainer from "../bookContainer/BookContainer";
import { baseUrl } from "../../assets/baseUrl";
import './Container.css';

const Container = () => {
  const [books, setBooks] = useState([]);

  const setFilteredBooks = (filteredBooks) => {
    setBooks(filteredBooks);
  };

  const fetchAllBooks = async () => {
    try {
      const res = await fetch(`${baseUrl}/Book/fetch-books`);
      const data = await res.json();
      // console.log(data);
      if(data.statusCode === 200)
        setBooks(data.books);
    } catch(error) {
      console.log('error in fetching all books ', error);
    }
  }

  useEffect(() => {
    fetchAllBooks();
  }, []);

  return (
    <div className="container">
      <SearchFilter setFilteredBooks={setFilteredBooks} />
      <BookContainer books={books} />
    </div>
  );
};

export default Container;
