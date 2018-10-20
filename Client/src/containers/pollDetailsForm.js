import React, {Component} from 'react';

import TextBox from '../components/textbox';
import TextAreaBox from '../components/textareabox';

class PollDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      poll: {
        question: ""
      }
    };

    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleTextArea(e) {
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

  handleFormSubmit(e) {
    e.preventDefault();
    let data = this.state.poll;
    alert(data.question);

    fetch("/create/details", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  };

  render() {
    return (
      <form className="container-fluid" onSubmit={this.handleFormSubmit}>

        <TextAreaBox
          title={"Question"}
          rows={2}
          value={this.state.poll.question}
          name={"question"}
          handleChange={this.handleTextArea}
          placeholder={"Type your question here"}
        />

        <div className="divider"></div>

        <input className="button-black button-black-transparent" type="submit" value="Submit" />
      </form>
    );
  }
}

export default PollDetails;
