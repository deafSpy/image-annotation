import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/endpoints/auth";
import { APP_LOGO } from "../constants/common";
import "react-toastify/dist/ReactToastify.css";


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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5rem', paddingTop: '1.25rem', paddingBottom: '5rem', color: '#1a202c' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', margin: '2.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid transparent', padding: '2rem', width: '100%', maxWidth: '28rem', marginLeft: 'auto', marginRight: 'auto', padding: '2.5rem' }}>
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', maxWidth: '24rem' }}>
          <Link to="/" style={{display: "flex", justifyContent: "center", width: "100%"}}>
            <img
              style={{ height: '2.5rem', width: 'auto' }}
              src={APP_LOGO}
              alt='E-Learning'
            />
          </Link>
          <h2 style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', lineHeight: '1.111', letterSpacing: 'tight', color: '#1a202c' }}>
            Sign in to your account
          </h2>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          <Form style={{ marginTop: '2.5rem', gap: '1.5rem' }}>
            <div>
              <label
                htmlFor='email'
                style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'medium', lineHeight: '1.5', color: '#1a202c' }}
              >
                Email address
              </label>
              <div style={{ marginTop: '0.5rem' }}>
                <Field
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  style={{ paddingLeft: '0.5rem', display: 'block', width: '100%', borderRadius: '0.375rem', border: 'none', padding: '0.375rem', color: '#1a202c', boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.075)', ringWidth: '1px', ringColor: '#cbd5e0', focus: { ringWidth: '2px', ringColor: '#4f46e5' } }}
                />
                <ErrorMessage
                  name='email'
                  component='div'
                  style={{ color: '#e53e3e', fontSize: '0.875rem' }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label
                  htmlFor='password'
                  style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'medium', lineHeight: '1.5', color: '#1a202c' }}
                >
                  Password
                </label>
                <div style={{ fontSize: '0.875rem' }}>
                  <a
                    href='/'
                    style={{ fontWeight: 'bold', color: '#4f46e5', textDecoration: 'none', hover: { color: '#4338ca' } }}
                  >
                    {/* Forgot password? */}
                  </a>
                </div>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <Field
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  style={{ paddingLeft: '0.5rem', display: 'block', width: '100%', borderRadius: '0.375rem', border: 'none', padding: '0.375rem', color: '#1a202c', boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.075)', ringWidth: '1px', ringColor: '#cbd5e0', focus: { ringWidth: '2px', ringColor: '#4f46e5' } }}
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  style={{ color: '#e53e3e', fontSize: '0.875rem' }}
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                style={{ display: 'flex', width: '100%', justifyContent: 'center', borderRadius: '0.375rem', backgroundColor: '#4f46e5', padding: '0.375rem', fontSize: '0.875rem', fontWeight: 'medium', lineHeight: '1.5', color: 'white', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', hover: { backgroundColor: '#4338ca' }, focusVisible: { outline: '2px solid transparent', outlineOffset: '2px', outlineColor: '#4f46e5' } }}
              >
                Sign in
              </button>
            </div>
          </Form>
        </Formik>

        <p style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#718096' }}>
          Do not have an account?
          <Link
            to='/register'
            style={{ fontWeight: 'bold', lineHeight: '1.5', color: '#4f46e5', textDecoration: 'none', hover: { color: '#4338ca' } }}
          >
            &nbsp; Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
