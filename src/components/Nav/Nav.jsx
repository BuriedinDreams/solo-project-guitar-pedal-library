import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';


import HomeIcon from '@material-ui/icons/Home';
// import { white } from '@material-ui/core/colors';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/home">
        {/* change this to a material UI home button */}
        {/* <h2 className="nav-title"></h2>  */}
        <HomeIcon color="primary" fontSize="large" />
      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        <Link className="navLink" to="/about">
          About
        </Link>

        {user.id && (
          <>
            <Link className="navLink" to="/details">
              Details
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
