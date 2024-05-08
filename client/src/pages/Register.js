import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/endpoints/auth";
import { APP_LOGO } from "../constants/common";
import "react-toastify/dist/ReactToastify.css";
import "../styles/register.css"

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (userInfo) => {
      try {
          console.log(userInfo)
        const response = await register({email: userInfo.email, first_name: userInfo.first_name, last_name: userInfo.last_name, username: userInfo.username, password: userInfo.password});
        console.log(response)

      toast.success("Registration successful!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      }); 
        
      response && navigate('/login')
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <div className="register-logo-link">
          <Link to="/" className="register-logo-link">
            <img
              src={APP_LOGO}
              alt='Image Annotation'
              className="register-img"
            />
          </Link>
          <h2 className="register-title">
            Register your account
          </h2>
        </div>
        <Formik
          initialValues={{ email: "", password: "", first_name: "", last_name: "", username: "" }}
          onSubmit={handleSubmit}
        >
          <Form className="register-form">
            <div className="register-name-fields">
              <div className="register-name-field">
                <label
                  htmlFor='first_name'
                  className="register-label"
                >
                  First Name
                </label>
                <Field
                  id='first_name'
                  name='first_name'
                  type='text'
                  required
                  className="register-field"
                />
                <ErrorMessage
                  name='first_name'
                  component='div'
                  className="register-error-message"
                />
              </div>

              <div className="register-name-field">
                <label
                  htmlFor='last_name'
                  className="register-label"
                >
                  Last Name
                </label>
                <Field
                  id='last_name'
                  name='last_name'
                  type='text'
                  required
                  className="register-field"
                />
                <ErrorMessage
                  name='last_name'
                  component='div'
                  className="register-error-message"
                />
              </div>
            </div>

            <div className="emailField">
              <label
                htmlFor='email'
                className="register-label"
              >
                Email address
              </label>
              <Field
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                className="register-field"
              />
              <ErrorMessage
                name='email'
                component='div'
                className="register-error-message"
              />
                      </div>
                      
                                  <div className="usernameField">
              <label
                htmlFor='username'
                className="register-label"
              >
                Username
              </label>
              <Field
                id='username'
                name='username'
                type='text'
                required
                className="register-field"
              />
              <ErrorMessage
                name='username'
                component='div'
                className="register-error-message"
              />
            </div>

            <div className="passwordField">
              <label
                htmlFor='password'
                className="register-label"
              >
                Password
              </label>
              <Field
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className="register-field"
              />
              <ErrorMessage
                name='password'
                component='div'
                className="register-error-message"
              />
            </div>

            <button
              type='submit'
              className="register-button"
            >
              Register
            </button>
          </Form>
        </Formik>

        <p className="register-link-text">
          Already have an account?
          <Link
                      to='/login'
                      className="register-bold-text"
          >
            &nbsp; Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
