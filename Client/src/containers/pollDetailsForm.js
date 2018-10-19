import React, {Component} from 'react';

import TextBox from '../components/textbox';
import TextAreaBox from '../components/textareabox';

class PollDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      poll: {
        question: ''
      }
    }

    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleDetailsSubmission = this.handleDetailsSubmission.bind(this);
  }

  handleQuestion(event) {
    let value = event.target.value;
    this.setState(prevState => ({
      poll: {...prevState.poll, question: value}
    }), () => console.log(this.state.poll));
  }

  handleDetailsSubmission(event) {
    let pollDetails = this.state.poll;
    console.log(pollDetails);
    alert(pollDetails.question);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleDetailsSubmission}>
        <TextAreaBox
          title={'Question'}
          rows={2}
          name={''}
          placeholder={'Type your question here'}
        />

        <center><input className="button-black button-black-transparent" type="submit" value="Next" /></center>
      </form>
    );
  }
}

export default PollDetails;
