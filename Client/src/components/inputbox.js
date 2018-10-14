import React, { Component } from 'react';

class Inputbox extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('submitted ' + this.state.value );
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label className="input-label">
          {this.props.label}
        </label>
        <input className="input-box" type="text" value={this.state.value} placeholder="Enter your question here" onChange={this.handleChange} />
        <center><input className="button-black button-black-transparent" type="submit" value="Submit" /></center>
      </form>
    );
  }
}

export default Inputbox;
