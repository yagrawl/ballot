import React, {Component} from 'react';

import TextAreaBox from '../components/textareabox';

class PollAttributes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      poll: {
      }
    };
  }

  handleQuestion(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        poll: {
          ...prevState.poll,
          question: value
        }
      })
    );
  }

  render() {
    return (
      <h2>step2</h2>
    );
  }
}

export default PollAttributes;
