import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../assets/baseUrl';
import toast from 'react-hot-toast';
import { setToken } from '../../features/userAuth/userAuthSlice';
import './Login.css';

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: ""
  });

  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const {name, value} = e.target;
    setUserLogin({
      ...userLogin,
      [name]: value
    });
  }

  const validateHandler = () => {
    const formError = {};

    if(userLogin.username === "") {
      formError.username = "username is required";
    } 
    if(userLogin.password === "") {
      formError.password = "password is required";
    }

    return formError;
  }

  const submitHandler = async () => {
    console.log(userLogin);

    try {
      const response = await fetch(`${baseUrl}/Auth`, {
        method: "POST",
        body: JSON.stringify(userLogin),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      // console.log(data);
      if(data.statusCode === 200) {
        toast.success("Logged in successfully");
        dispatch(setToken(data.token));
        navigate("/");
      } else if(data.statusCode === 400) {
        toast.error("Wrong credentials. Please try again!!");
      }
    } catch(error) {
      toast.error("something went wrong");
      console.log(error);
    }
  }

  const formHandler = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setFormError(validateHandler());
  }

  useEffect(() => {
    if(Object.keys(formError).length === 0 && isSubmit) 
      submitHandler();
  }, [formError]);

  return (
    <div className="login">
      <div className="container">
        <h1>Login</h1>
        <form className="form-container" onSubmit={formHandler}>
          <div className="form-field">
            <input
              type="email"
              name="username"
              id="email"
              className="email field"
              placeholder="Email"
              onChange={changeHandler}
              value={userLogin.username}
            />
            <div className='err'>{formError.username}</div>
          </div>

          <div className="form-field">
            <input
              type="password"
              name="password"
              id="password"
              className="password field"
              placeholder="Password"
              onChange={changeHandler}
              value={userLogin.password}
            />
            <div className='err'>{formError.password}</div>
          </div>

          <button type="submit" className="form-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login