import React, {Component} from 'react';

class PollWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.poll_id,
      response: [{
        analytics_privacy: "",
        creation_time: "",
        creator_id: "",
        expiration_time: "",
        feed_privacy: "",
        ip_address: "",
        option_1: "",
        option_2: "",
        option_3: "",
        option_4: "",
        poll_id: "",
        question: ""
      }],
      ip_address: "",
      has_voted: false,
    }

    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    fetch('/api/poll/' + this.state.id)
      .then(response => response.json())
      .then(data => this.setState(
        prevState => ({
          ...prevState,
          response: data.details
        })
      ));

    fetch('/ip')
    .then(response => response.json())
    .then(data => {
      this.setState(
        prevState => ({
          ...prevState,
          ip_address: data.express
        })
      );

      fetch(`/api/activity?poll=${this.state.id}&ip=${this.state.ip_address}`)
      .then(res => res.json())
      .then(data => {
        if(data.details.length !== 0) {
          this.setState(
            prevState => ({
              ...prevState,
              has_voted: true
            })
          );
        }
      })
      .catch(err => console.log(err))
    });
  }

  handleVote(e) {
    let vote = e.target.value;
    let data = {
      vote: e.target.value,
      poll_id: this.state.id,
      ip_address: this.state.ip_address
    }

    console.log(data);
    fetch("/api/activity", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
      }
    )
    .catch(error => console.error('Error:', error));
  }

  renderOptions() {
    let options = [];

    if(this.state.response[0].option_1 !== 'NULL')
      options.push(this.state.response[0].option_1);
    if(this.state.response[0].option_2 !== 'NULL')
      options.push(this.state.response[0].option_2);
    if(this.state.response[0].option_3 !== 'NULL')
      options.push(this.state.response[0].option_3);
    if(this.state.response[0].option_4 !== 'NULL')
      options.push(this.state.response[0].option_4);

    let elements = options.map((value, index) => (
        <button value={index + 1} onClick={this.handleVote} className="poll-option-button">{value}</button>
    ));

    return elements;
  }

  render() {
    {
      if(this.state.has_voted) {
        return (
            <p className="poll-question-p">You've already voted.</p>
        )
      } else {
        return (
          <div>
            <p className="poll-question-p">{this.state.response[0].question}</p>
            <center>
              {this.renderOptions()}
            </center>
          </div>
        )
      }
    }
  }
}

export default PollWidget;
