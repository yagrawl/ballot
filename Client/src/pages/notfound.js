import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import notFoundArt from '../assets/imgs/notfound.png';

class NotFound extends Component {
  render() {
    return (
      <div className="App">
        <header className="not-found-header">
          <img src={notFoundArt} className="not-found-image" alt="not found graphic"/>
          <p>404 : NOT FOUND</p>
          <Link to={'./'}>
            <button className="button button-transparent">
              Go Back Home
            </button>
          </Link>
        </header>
      </div>
    );
  }
}

export default NotFound;
