import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom" 
import { baseUrl } from "../../assets/baseUrl";
import { AiOutlineSearch } from "react-icons/ai";
import './SearchFilter.css';

const SearchFilter = (props) => {
  const [searchInfo, setSearchInfo] = useState({
    rating: "-1",
    search: "",
  });

  const { setFilteredBooks } = props;
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userAuth);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSearchInfo({
      ...searchInfo,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(searchInfo);

    try {
      const res = await fetch(
        `${baseUrl}/Book/fetch-filtered-books?searchText=${searchInfo.search}&rating=${searchInfo.rating}`
      );
      const data = await res.json();
      console.log(data);
      if (data.statusCode === 200) setFilteredBooks(data.books);
    } catch (error) {
      console.log("error in filtering data ", error);
    }
  };

  return (
    <div className="search-filter">
      <select 
      name="rating" 
      className="search-rating" 
      onChange={changeHandler}
      value={searchInfo.rating}
      >
        <option value="-1">All Ratings</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <div className="search-container">
        <AiOutlineSearch className="search-icon" />
        <input
          type="text"
          name="search"
          className="search-text"
          placeholder="Search author name, book name"
          onChange={changeHandler}
          value={searchInfo.search}
        />
      </div>

      <button className="search-book search-btn" onClick={submitHandler}>
        Search Book
      </button>

      {token !== null && (
        <button className="create-book search-btn" onClick={() => navigate("/create-book")}>
          Add Book
        </button>
      )}
    </div>
  );
};

export default SearchFilter;
