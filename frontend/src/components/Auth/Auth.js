import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';

import Input from './Input';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
    resetForm();
  };

  const resetForm = () => { 
    document.getElementById("auth-form").reset();
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };


  const handleChange = (e) => {
    setFormData( { ...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className="authForm">
      <form onSubmit={handleSubmit} id="auth-form">
        <input type="hidden" value="prayer" />
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" placeholder="First Name *" handleChange={handleChange} autoFocus half />
              <Input name="lastName" placeholder="Last Name *" handleChange={handleChange} half />
              <Input name="username" placeholder="Username *" handleChange={handleChange} />
            </>
            )}
            <Input name="email" placeholder="Email *" handleChange={handleChange} type="email" />
            <Input name="password" placeholder="Password *" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" placeholder="Repeat Password *" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className='authForm-btn'>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Button variant='text' href="/forgot-password" className='authForm-forgot'>Forgot your password?</Button>
            </Grid>
          </Grid>
          <hr />
          <Grid container justifyContent="center">
            <Grid item>
              <Button variant="contained" className='authForm-btn--secondary' onClick={switchMode}>
                { isSignup ? 'Sign in' : "Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
    </div>
  )
}

export default Auth