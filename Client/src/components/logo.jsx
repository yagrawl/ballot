import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/imgs/logo.png';

const Logo = (props) => (
  <div>
    <Link to={props.link}>
      <div className="setup-navbar">
        <img src={logo} className="logo-image" alt="logo" />
      </div>
    </Link>
  </div>
);

export default Logo;
