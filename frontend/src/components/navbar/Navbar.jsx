import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setUsername,
  setCoins,
  setEmail,
  setToken,
} from "../../features/userAuth/userAuthSlice";
import toast from "react-hot-toast";
import { baseUrl } from "../../assets/baseUrl";
import "./Navbar.css";

const Navbar = () => {
  const { token, username, email, coins } = useSelector(
    (state) => state.userAuth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await fetch(`${baseUrl}/Auth`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.statusCode === 200) {
        dispatch(setUsername(data.name));
        dispatch(setEmail(data.username));
        dispatch(setCoins(data.coins));
      }
    } catch (error) {
      console.log("error in fetching user while authenticating", error);
    }
  };

  const logoutHandler = () => {
    dispatch(setToken(null));
    dispatch(setUsername(null));
    dispatch(setEmail(null));
    dispatch(setCoins(null));
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    if (token !== null) fetchUser();
  }, [token]);

  return (
    <div className="navbar">
      <div className="header" onClick={() => navigate("/")}>
        Library Management System
      </div>

      <div className="content-container">
        {token === null && (
          <button
            onClick={() => navigate("/login")}
            className="login-btn nav-btn"
          >
            Login
          </button>
        )}

        {token !== null && (
          <div className="user-info-container">
            <div className="greet-user">
              <span className="txt-bold">Hi</span> {username} !
            </div>

            <div className="coins-info">
              <span className="txt-bold">you have</span> {coins}{" "}
              <span className="txt-bold">Coins</span>
            </div>

            <button
              onClick={() => navigate("/added-books")}
              className="nav-btn"
            >
              View added books
            </button>

            <button
              onClick={() => navigate("/borrowed-books")}
              className="nav-btn"
            >
              View borrowed books
            </button>

            <button onClick={logoutHandler} className="nav-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
