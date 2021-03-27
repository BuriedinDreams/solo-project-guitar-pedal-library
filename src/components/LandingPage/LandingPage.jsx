import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            Hello, are you looking for an exciting new community to be part of? To gain knowledge and share wisdom about guitar pedals, if so welcome to the Guitar Pedal Library website.
            On this website you will be able to look through a vast collection of physical guitar pedals posted by users. Getting started is easy, the first step to joining this exciting community is by signing up for an account.
            All you need to do is enter a Username "pick something creative because other users will see this displayed." And of course a password.
            If you already a member just login!
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
