import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/endpoints/auth";
import { APP_LOGO } from "../constants/common";
import "react-toastify/dist/ReactToastify.css";
import "../styles/login.css"


const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [account, setAccount] = useState(null)
  const navigate = useNavigate();
    
  const handleSubmit = async (userInfo) => {
    try {
        const response = await login(userInfo);
        console.log(response.data)
        const { accessToken } = response.token
        
        const setToken = (accessToken) => {
            localStorage.setItem(
                "accessToken",
                JSON.stringify({
                    accessToken,
                })
            );
        }

        setToken(accessToken)

        console.log(
            {
                email: response?.data.email, 
                username: response?.data.username, 
                first_name: response?.data.first_name, 
                last_name: response?.data.last_name, 
                username: response?.data.username,
                id: response?.data.id
            }
        )


        localStorage.setItem("account", JSON.stringify({
                                            email: response?.data.email, 
                                            username: response?.data.username, 
                                            first_name: response?.data.first_name, 
                                            last_name: response?.data.last_name, 
                                            username: response?.data.username,
                                            id: response?.data.id
                                        }))


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

        const account1 = localStorage.getItem("account")
        if (account1) {
            navigate("/upload")
            toast.warning("Already logged in", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }


  },[])
  

    return (
  <>
            {!isLoggedIn ? (<div className="login-wrapper">
                <div className="login-box">
                    <div className="login-title-box">
                        <Link to="/" className="login-logo-link">
                            <img
                                className="login-img"
                                src={APP_LOGO}
                                alt='Image Annotation'
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
            </div>)
    : <div>Loading...</div>}
    </>
  );
};

export default Login;
