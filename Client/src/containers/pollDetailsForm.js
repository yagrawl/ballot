import React, {Component} from 'react';

import TextAreaBox from '../components/textareabox';

class PollDetails extends Component {

  saveAndContinue = (e) => {
      e.preventDefault()
      this.props.nextStep()
    }

  render() {
    return (
      <div>
        <h1>here</h1>
        <button onClick={this.saveAndContinue}>Next</button>
      </div>
    );
  }
}

export default PollDetails;
