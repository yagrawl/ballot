import React from 'react';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

const Logo = (props) => (
  <div className="login-button-position">
    <FacebookLogin
      appId={"2075066269470448"}
      callback={props.callback}
      cssClass={"button-black button-black-transparent"}
      textButton={"Login"}
    />
  </div>
);

export default Logo;