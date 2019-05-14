import React from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => (
  <div className="login-button-position">
    <Link to={'./auth'}>
      <button className="button-black button-black-transparent">Login</button>
    </Link>
  </div>
);

export default Login;
