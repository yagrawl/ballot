import React, {Component} from 'react';

import PollDetails from '../containers/pollDetailsForm';
import PollAttributes from '../containers/pollAttributesForm';
import PollLink from '../containers/pollLink';

class PollForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      poll_id: 'creating'
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
        analytics_privacy: "",
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

    if(data.hasOwnProperty('duration')) {
      data.attributes.creation_time = new Date().getTime();
      data.attributes.expiration_time = data.duration;
      data.attributes.ip_address = data.ip_address;
      delete data.ip_address;
      delete data.duration;

      fetch("/api/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json())
      .then(response => {
          this.setState(
            prevState => ({
              ...prevState,
              poll_id : response.poll_id
            })
          );
        }
      )
      .catch(error => console.error('Error:', error));
    }
  };

  nextStep = () => {
    this.setState(
      prevState => ({
        ...prevState,
        step : this.state.step + 1
      })
    );
  };

  render() {

    let poll_details = this.state;

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
                  returnValues={this.returnValues}
                />
      case 3:
        return <PollLink
                  pollid={poll_details.poll_id}
                />
		}
  }
}

export default PollForm;
