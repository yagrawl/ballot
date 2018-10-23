import React, {Component} from 'react';

import TextAreaBox from '../components/textareabox';

class PollAttributes extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  handleNext = (e) => {
    e.preventDefault()

    this.props.returnValues(this.state);
    this.props.nextStep();
  }

  handleFeedPrivacyChange(e) {
    console.log(e.target.value);
  }

  render() {
    return (
      <div>
        <form>
          <p className="input-label">Poll Duration</p>
          <button className="button-black button-black-transparent"
            onClick={this.handleNext} >Create</button>
        </form>
      </div>
    );
  }
}

export default PollAttributes;
