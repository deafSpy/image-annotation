import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/endpoints/auth";
import { APP_LOGO } from "../constants/common";
import "react-toastify/dist/ReactToastify.css";
import "../styles/login.css"


const Login = () => {
  const navigate = useNavigate();
    // const isLoggedIn = useState(false)
    
  const handleSubmit = async (userInfo) => {
    try {
        const response = await login(userInfo);
        console.log(response)
        const { accessToken } = response.data
        
        const setToken = (accessToken) => {
            localStorage.setItem(
                "accessToken",
                JSON.stringify({
                    accessToken,
                })
            );
        }

        setToken(accessToken)

        localStorage.setItem("isLoggedIn", true)
        localStorage.setItem("userID", response?.data?.id)

      toast.success(response?.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      }); 
        
      response && navigate('/upload')
    } catch (error) {
      toast.error(error.data?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
    
    useEffect(() => {

        // const isLoggedIn = localStorage.getItem("isLoggedIn")

        // if (isLoggedIn !== null && isLoggedIn) {
        //     console.log(isLoggedIn)
        //     navigate("/upload")
        // }
        
  },[])
  

  return (
    <div className="login-wrapper">
          <div className="login-box">
        <div className="login-title-box">
          <Link to="/" className="login-logo-link">
            <img
              className="login-img"
              src={APP_LOGO}
              alt='E-Learning'
            />
          </Link>
          <h2 className="login-title">
            Sign in to your account
          </h2>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          <Form className="login-form">
            <div>
              <label
                htmlFor='email'
                className="login-label1"
              >
                Email address
              </label>
              <div className="login-email-wrapper">
                <Field
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className="login-email login-field"
                />
                <ErrorMessage
                  name='email'
                  component='div'
                  className="login-error"
                />
              </div>
            </div>

            <div className="login-password-block">
              <div className="login-password">
                <label
                  htmlFor='password'
                  className="login-password-label"
                >
                  Password
                </label>
                <div className="login-forgot-password">
                  <a
                    href='/'
                    className="login-forgot-password-label"
                  >
                    {/* Forgot password? */}
                  </a>
                </div>
              </div>
              <div className="login-password2">
                <Field
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className="login-password-form login-field"
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  className="login-error"
                />
              </div>
            </div>

            <div className="login-submit">
              <button
                type='submit'
                className="login-submit-button"
              >
                Sign in
              </button>
            </div>
          </Form>
        </Formik>

        <p className="link-register">
          Do not have an account?
          <Link
            to='/register'
            className="link-register-link"
          >
            &nbsp; Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
