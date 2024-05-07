import React,{useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/endpoints/auth";
import { APP_LOGO } from "../constants/common";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (userInfo) => {
      try {
          console.log(userInfo)
        const response = await register(userInfo);
        console.log(response)

      toast.success("Registration successful!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      }); 
        
    //   response && navigate('/login')
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5rem', paddingTop: '1.25rem', paddingBottom: '5rem', color: '#1a202c' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', margin: '2.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid transparent', padding: '2rem', width: '100%', maxWidth: '28rem', marginLeft: 'auto', marginRight: 'auto', padding: '2.5rem' }}>
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', maxWidth: '24rem' }}>
          <Link to="/" style={{display: "flex", justifyContent: "center", width: "100%"}}>
            <img
              style={{ height: '2.5rem', width: 'auto' }}
              src={APP_LOGO}
              alt='Image Annotation'
            />
          </Link>
          <h2 style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', lineHeight: '1.111', letterSpacing: 'tight', color: '#1a202c' }}>
            Register your account
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
              <label
                htmlFor='password'
                style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'medium', lineHeight: '1.5', color: '#1a202c' }}
              >
                Password
              </label>
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
                Register
              </button>
            </div>
          </Form>
        </Formik>

        <p style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#718096' }}>
          Already have an account?
          <Link
            to='/login'
            style={{ fontWeight: 'bold', lineHeight: '1.5', color: '#4f46e5', textDecoration: 'none', hover: { color: '#4338ca' } }}
          >
            &nbsp; Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
