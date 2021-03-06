import React, {Component} from 'react';
import Countdown from 'react-countdown-now';

import avatar from '../assets/imgs/default_avatar.png';
import PollEmbedAnalytics from '../containers/pollembedanalytics';
import Loader from '../components/loader';
import PollNotFound from '../components/pollnotfound';

class Embed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.poll_id,
      response: [{
        analytics_privacy: "false",
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
        id: "",
        name: "",
        profile_picture: avatar,
        email: ""
      },
      stats: {
        '1': '0%',
        '2': '0%',
        '3': '0%',
        '4': '0%'
      },
      ip_address: "",
      has_voted: false,
      is_logged_in: false,
      poll_loaded: false,
      countdown: 1000,
      poll_found: true
    }

    this.handleVote = this.handleVote.bind(this);
    this.props.embed();
  }

  componentDidMount() {
    fetch('/api/activity/pre_analytics/' + this.state.id)
      .then(response => response.json())
      .then(data => {
        this.setState(
          prevState => ({
            ...prevState,
            stats: data.details
          })
        )

        console.log('%cPoll Pre Analytics:', 'background: #192039; color: white');
        console.log('Poll Pre Stats: ', this.state);

      });

    fetch('/api/poll/' + this.state.id)
      .then(response => response.json())
      .then(data => {

        if(data.details.length === 0) {
          this.setState(
            prevState => ({
              ...prevState,
              poll_loaded: true,
              poll_found: false
            })
          );
        } else {
          this.setState(
            prevState => ({
              ...prevState,
              response: data.details,
              poll_loaded: true
            })
          );

          let expiration = parseInt(this.state.response[0].expiration_time)*24*60*60*1000;
          let creation = parseInt(this.state.response[0].creation_time);

          let countdown = (expiration + creation);
          this.setState({countdown: countdown})

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
      });

      fetch('/ip')
      .then(response => response.json())
      .then(data => {
        this.setState(
          prevState => ({
            ...prevState,
            ip_address: data.express
          })
        );

        if(this.state.poll_found) {
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

            if(localStorage.hasOwnProperty(this.state.id)) {
              this.setState(
                prevState => ({
                  ...prevState,
                  has_voted: true
                })
              );
            }
          })
          .catch(err => console.log(err))
        }
      });
  }

  renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (<span>Poll Expired</span>);
    } else {
      if(days === 0) {
        return <span>{hours}:{minutes}:{seconds}</span>;
      } else if(days === 1) {
        return <span>{days} day {hours} hours</span>;
      } else {
        return <span>{days} days {hours} hours</span>;
      }
    }
  };

  handleVote(e) {
    let vote = e.target.value;
    localStorage.setItem(this.state.id, vote);
    this.setState(
      prevState => ({
        ...prevState,
        has_voted: true
      })
    );

    let data = {
      vote: vote,
      poll_id: this.state.id,
      ip_address: this.state.ip_address
    }

    fetch("/api/activity", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => {
      console.log('Activity Response: ', response);
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

    let elements;

    if(this.state.response[0].analytics_privacy === 'true') {
      elements = options.map((value, index) => (
          <button value={index + 1}
                  onClick={this.handleVote}
                  style={{background: `linear-gradient(to right, rgb(139,217,249, 0.25) ${this.state.stats[index + 1]}, white ${this.state.stats[index + 1]})`}}
                  className="poll-option-button-analytics">{value}</button>
      ));
    } else {
      elements = options.map((value, index) => (
        <button value={index + 1} onClick={this.handleVote}
                className="poll-option-button">{value}</button>
      ));
    }


    return elements;
  }

  addLabel() {
    if(this.state.has_voted) {
      return <span className="poll-status-voted poll-status-embed">You've voted</span>
    }
    else if(this.state.countdown - Date.now() <= 0 && !(this.state.has_voted)) {
      return <span className="poll-status-expired poll-status-embed">Poll Expired</span>
    }
    else {
      return (
          <span className="poll-status-timer poll-status-embed">
            <Countdown date={this.state.countdown} renderer={this.renderer}/>
          </span>
        )
    }
  }

  checkPollVote() {
    if(this.state.has_voted || this.state.countdown - Date.now() <= 0) {
      return (
        <div className="embed-poll-analytics">
        <PollEmbedAnalytics
          poll_id={this.state.id}
          question={this.state.response[0].question}
          options={[this.state.response[0].option_1,
                    this.state.response[0].option_2,
                    this.state.response[0].option_3,
                    this.state.response[0].option_4 ]}
          size={150}
          />
        </div>
      );
    } else {
      return (
        <div className="embed-poll-options">
          {this.renderOptions()}
        </div>
      )
    }
  }

  renderPoll() {
      return (
        <div>
          <p className="poll-question-p">{this.state.response[0].question}</p>
          <center>
            {this.checkPollVote()}
          </center>
        </div>
      )
  }

  render() {
    if(this.state.poll_loaded){
      if(this.state.poll_found) {
        return this.renderPoll();
      } else {
        return <PollNotFound />
      }
    } else {
      return <Loader />
    }
  }
}

export default Embed;
