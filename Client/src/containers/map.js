import React, { Component } from 'react';

import Pin from '../components/mappin'
import { sendEvent } from '../containers/event'

class Maps extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }


  render() {
    return(
      <div>
        <Pin/>
      </div>
    )
  }
}

export default Maps;
