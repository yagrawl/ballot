import React, {Component} from 'react';

import PollDetails from '../containers/pollDetailsForm';
import PollAttributes from '../containers/pollAttributesForm';

class PollForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1
    };

    this.response = {
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
  }

  returnValues = (values) => {
    console.log(values);
    return () => {
      this.response = Object.assign({}, this.response, values);
    }
  };

  nextStep = () => {
    this.setState({
      step : this.state.step + 1
    })
  };

  render() {
    switch (this.state.step) {
			case 1:
				return <PollDetails
                  nextStep={this.nextStep}
                  response={this.response.details.question}
                  returnValues={this.returnValues}
                />
			case 2:
				return <PollAttributes />
		}
  }
}

export default PollForm;
