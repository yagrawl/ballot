import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../components/logo'
import CreateForm from '../containers/CreateForm';

class Create extends Component {
  render() {
    return (
      <div>
        <Logo link="./"/>
        <header className="create-header">
          <div className="active-area">
            <p className="page-title">Create Poll</p>
            <CreateForm />
          </div>
        </header>
      </div>
    );
  }
}

export default Create;
