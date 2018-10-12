import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import notFoundArt from '../assets/imgs/notfound.png';

class NotFound extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={notFoundArt} className="not-found"/>
          <p>404 : NOT FOUND</p>
          <Link to={'./create'}>
            <button className="ButtonStyle button1">
              Go Back Home
            </button>
          </Link>
        </header>
      </div>
    );
  }
}

export default NotFound;
