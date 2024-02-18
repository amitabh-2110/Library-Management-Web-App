import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../assets/baseUrl";
import "./CreateBook.css";

const CreateBook = () => {
  const [bookInfo, setBookInfo] = useState({
    bookName: "",
    author: "",
    genre: "",
    description: "",
  });

  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const { token, email } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setBookInfo({
      ...bookInfo,
      [name]: value,
    });
  };

  const validateHandler = () => {
    const formError = {};

    if (bookInfo.bookName === "") {
      formError.bookName = "Book name is required";
    }
    if (bookInfo.author === "") {
      formError.author = "Author is required";
    }
    if (bookInfo.genre === "") {
      formError.genre = "Genre is required";
    }
    if (bookInfo.description === "") {
      formError.description = "Description is required";
    }

    return formError;
  };

  const formHandler = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setFormError(validateHandler());
  };

  const submitHandler = async () => {
    const book = { ...bookInfo, username: email };

    try {
      const res = await fetch(`${baseUrl}/User/add-book`, {
        method: "POST",
        body: JSON.stringify(book),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.statusCode === 200) {
        toast.success("Book added successfully");
        navigate("/");
      } else {
        toast.error("something went wrong");
        console.log(error);
      }
    } catch (error) {
      console.log("error in creating book ", error);
    }
  };

  useEffect(() => {
    if(Object.keys(formError).length === 0 && isSubmit)
      submitHandler();
  }, [formError])

  return (
    <div className="create-book">
      <form onSubmit={formHandler} className="form-container-create-book">
        <div className="ipt-container">
          <label>
            <div className="ipt-head">Book name</div>
            <input
              type="text"
              name="bookName"
              className="bookName ipt"
              value={bookInfo.bookName}
              onChange={changeHandler}
            />
          </label>
          <div className="err">{formError.bookName}</div>
        </div>

        <div className="ipt-container">
          <label>
            <div className="ipt-head">Author</div>
            <input
              type="text"
              name="author"
              className="author ipt"
              value={bookInfo.author}
              onChange={changeHandler}
            />
          </label>
          <div className="err">{formError.author}</div>
        </div>

        <div className="ipt-container">
          <label>
            <div className="ipt-head">Genre</div>
            <input
              type="text"
              name="genre"
              className="genre ipt"
              value={bookInfo.genre}
              onChange={changeHandler}
            />
          </label>
          <div className="err">{formError.genre}</div>
        </div>

        <div className="ipt-container">
          <div className="ipt-head">Description</div>
          <textarea
            name="description"
            className="description"
            cols="30"
            rows="20"
            value={bookInfo.description}
            onChange={changeHandler}
          ></textarea>
          <div className="err">{formError.description}</div>
        </div>

        <div className="submit-btn">
          <button className="btn form-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateBook;
