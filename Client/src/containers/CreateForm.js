import React, {Component} from 'react';

import PollDetails from '../containers/pollDetailsForm';
import PollAttributes from '../containers/pollAttributesForm';

let response = {
  details: {
    question: "",
    options: []
  },
  attributes: {
    creator_id: "",
    creation_time: "",
    expiration_time: "",
    feed_privacy: "",
    analtyics_privacy: "",
    tags: [],
    ip_address: ""
  }
}

class PollForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1
    };
  }

  render() {
    switch (this.state.step) {
			case 1:
				return <PollDetails />
			case 2:
				return <PollAttributes />
		}
  }
}

export default PollForm;
