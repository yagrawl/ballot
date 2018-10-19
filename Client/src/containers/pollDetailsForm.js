import React, {Component} from 'react';

import TextBox from '../components/textbox';
import TextAreaBox from '../components/textareabox';

class PollDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      poll: {
        question: "",
        option1: ""
      }
    };

    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleFullName = this.handleFullName.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFullName(e) {
    console.log("Inside handleFullName");
    let value = e.target.value;
    this.setState(
      prevState => ({
        poll: {
          ...prevState.poll,
          option1: value
        }
      }),
      () => console.log(this.state.poll)
    );
  }

  handleTextArea(e) {
    console.log("Inside handleTextArea");
    let value = e.target.value;
    this.setState(
      prevState => ({
        poll: {
          ...prevState.poll,
          question: value
        }
      }),
      () => console.log(this.state.poll)
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.poll;

    fetch("/create/details", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log("Successful" + data);
        alert(data.question);
      });
    });
  }

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
        <TextBox
          title={"Option"}
          name={"option1"}
          value={this.state.poll.option1}
          placeholder={"Enter Option"}
          handleChange={this.handleFullName}
        />

        <input className="button-black button-black-transparent" type="submit" value="Submit" />
      </form>
    );
  }
}

export default PollDetails;
