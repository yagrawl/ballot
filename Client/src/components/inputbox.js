import React, { Component } from 'react';

class Inputbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      option: {
        option1: '',
        option2: '',
        option3: '',
        option4: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert('submitted ' + this.state.question + ' ' +  this.state.option.option1);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label className="input-label">{this.props.label}</label>
        <input className="input-box" type="text" value={this.state.question} name="question" placeholder="Enter your question here" onChange={this.handleChange} />

        <label className="input-label">Random</label>
        <input className="input-box" type="text" value={this.state.option.option1} name="option1" placeholder="option1" onChange={this.handleChange} />

        <center><input className="button-black button-black-transparent" type="submit" value="Submit" /></center>
      </form>
    );
  }
}

export default Inputbox;
