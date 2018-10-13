import React, { Component } from 'react';

class Inputbox extends Component {
  constructor(props) {
    super(props);
    this.state = {question: '',
                  option1: '',
                 };

    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleQuestionChange(event) {
    this.setState({question: event.target.question});
  }

  handleOptionChange(event) {
    this.setState({option1: event.target.option1});
  }

  handleSubmit(event) {
    alert('submitted ' + this.state.question + ' ' + this.state.option1 );
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label className="input-label">
          {this.props.label}
        </label>
        <input className="input-box" type="text" value={this.state.question} onChange={this.handleQuestionChange} />
        <input className="input-box" type="text" value={this.state.option1} onChange={this.handleOptionChange} />
        <input className="button-black button-black-transparent" type="submit" value="Submit" />
      </form>
    );
  }
}

export default Inputbox;
