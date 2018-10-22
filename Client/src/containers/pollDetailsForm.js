import React, {Component} from 'react';

import TextAreaBox from '../components/textareabox';

class PollDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      poll: {
        question: "",
        options: []
      }
    };

    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

  handleOptionChange(e, index) {
    let value = e.target.value;
    this.state.poll.options[index] = value;
    this.setState(
      prevState => ({
        poll: {
          ...prevState.poll,
          options: this.state.poll.options
        }
      })
    );
  }

  handleOptionRemove(index) {
    this.state.poll.options.splice(index, 1);
    this.setState(
      prevState => ({
        poll: {
          ...prevState.poll,
          options: this.state.poll.options
        }
      })
    );
  }

  handleOptionAdd = () => {
    this.setState(
      prevState => ({
        poll: {
          ...prevState.poll,
          options: [...this.state.poll.options, ""]
        }
      })
    );
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let data = this.state.poll;

    fetch("/api/poll_init", {
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
      <form onSubmit={this.handleFormSubmit}>

        <TextAreaBox
          title={"Question"}
          rows={2}
          value={this.state.poll.question}
          name={"question"}
          handleChange={this.handleQuestion}
          placeholder={"Type your question here"}
        />
        <div className="divider"></div>
        <p className="input-label input-label-option">Options</p>

        {
          this.state.poll.options.map((option, index) => {
              return (
                <div key={index + 1} className="reduced-margin-bottom">
                  <input
                    value={option}
                    className={"input-box input-box-option"}
                    onChange={(e) => this.handleOptionChange(e, index)}
                    placeholder={`Enter Option ${index + 1}`}
                  />

                  <button className="button-black button-black-transparent"
                    onClick={() => this.handleOptionRemove(index)} type="button">
                    X
                  </button>
                </div>
              )
          })
        }
        <button className="button-black button-black-transparent"
          onClick={() => this.handleOptionAdd()} type="button">
          Add
        </button>

        <input className="button-black button-black-transparent" type="submit" value="Next" />
      </form>
    );
  }
}

export default PollDetails;
