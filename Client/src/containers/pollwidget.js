import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import avatar from '../assets/imgs/default_avatar.png';
import PollAnalytics from '../containers/pollanalytics';

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
      user: {
        user_id: "",
        name: "",
        profile_picture: avatar,
        email: ""
      },
      ip_address: "",
      has_voted: false,
      is_logged_in: false
    }

    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    fetch('/api/poll/' + this.state.id)
      .then(response => response.json())
      .then(data => {
        this.setState(
          prevState => ({
            ...prevState,
            response: data.details
          })
        );

        fetch('/api/user/' + this.state.response[0].creator_id)
        .then(response => response.json())
        .then(data => {
          this.setState(
            prevState => ({
              ...prevState,
              user: data.details.details
            })
          );
        })
      }
    );

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

    this.setState(
      prevState => ({
        ...prevState,
        has_voted: true
      })
    );

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
    .then(response => {
      console.log(response);
    })
    .then(response => console.log('Success:', JSON.stringify(response)))
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
          <div>
            <p className="poll-question-p">You've voted.</p>
            <center>
              <PollAnalytics
              poll_id={this.state.id}
              question={this.state.response[0].question}
              options={[this.state.response[0].option_1,
                        this.state.response[0].option_2,
                        this.state.response[0].option_3,
                        this.state.response[0].option_4 ]}
              />
            </center>
            <Link to={`.././user/${this.state.response[0].creator_id}`}>
              <img className="avatar-top" src={this.state.user.profile_picture}></img>
            </Link>
          </div>
        )
      } else {
        return (
          <div>
            <p className="poll-question-p">{this.state.response[0].question}</p>
            <center>
              {this.renderOptions()}
            </center>
            <Link to={`.././user/${this.state.response[0].creator_id}`} replace>
              <img className="avatar-top" src={this.state.user.profile_picture}></img>
            </Link>
          </div>
        )
      }
    }
  }
}

export default PollWidget;
