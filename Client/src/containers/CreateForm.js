import React, {Component} from 'react';

import PollDetails from '../containers/pollDetailsForm';
import PollAttributes from '../containers/pollAttributesForm';
import PollLink from '../containers/pollLink';

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
    this.response = Object.assign({}, this.response, values);
    delete this.response.input;
    delete this.response.options;

    let data = this.response;

    fetch("/api/poll_init", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  };

  createPoll = (values) => {
    console.log(values);
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
				return <PollAttributes
                  nextStep={this.nextStep}
                  response={this.response.details.question}
                  returnValues={this.createPoll}
                />
      case 3:
        return <PollLink />
		}
  }
}

export default PollForm;
