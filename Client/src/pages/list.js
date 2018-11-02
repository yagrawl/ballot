import React, { Component } from 'react';

import Loader from '../components/loader'

class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      has_loaded: false
    }
  }

  render() {
    return(
      <Loader />
    )
  }
}

export default List;
