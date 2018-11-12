import React from 'react';

import logo from '../assets/imgs/logo.png';

const Logo = (props) => (
  <div>
    <a href={props.link}>
      <div className="setup-navbar">
        <img src={logo} className="logo-image" alt="logo" />
      </div>
    </a>
  </div>
);

export default Logo;
