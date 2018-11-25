import React, {Component} from 'react';

import {ResponsiveContainer,
        Tooltip,
        PieChart, Pie,
        LabelList } from 'recharts';

import '../../node_modules/react-vis/dist/style.css';

class PollAnalytics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.poll_id,
      stats: {
        opt_1: 0,
        opt_2: 0,
        opt_3: 0,
        opt_4: 0
      },
      question: this.props.question,
      options: this.props.options
    }

    this.stats = {1: 0, 2: 0, 3: 0, 4: 0 };
  }

  componentDidMount() {
    fetch('/api/activity/analytics/' + this.state.id)
      .then(response => response.json())
      .then(data => {

          for(let i = 0; i < data.details.length; i++) {
            if(data.details[i].selection === "1") {
              this.stats[1] += 1;
            }
            if(data.details[i].selection === "2") {
              this.stats[2] += 1;
            }
            if(data.details[i].selection === "3") {
              this.stats[3] += 1;
            }
            if(data.details[i].selection === "4") {
              this.stats[4] += 1;
            }
          }

          console.log('%cPoll Analytics:', 'background: #292D34; color: white');
          console.log('Poll Stats: ', this.stats);

          this.setState(
            prevState => ({
              ...prevState,
              opt_1: this.stats[1],
              opt_2: this.stats[2],
              opt_3: this.stats[3],
              opt_4: this.stats[4]
            })
          );

          if(this.stats[1] === 0) {
            this.setState(
              prevState => ({
                ...prevState,
                options: [0, this.state.options[1], this.state.options[2], this.state.options[3]]
              })
            )
          }

          if(this.stats[2] === 0) {
            this.setState(
              prevState => ({
                ...prevState,
                options: [this.state.options[0], 0, this.state.options[2], this.state.options[3]]
              })
            )
          }

          if(this.stats[3] === 0) {
            this.setState(
              prevState => ({
                ...prevState,
                options: [this.state.options[0], this.state.options[1], 0, this.state.options[3]]
              })
            )
          }

          if(this.stats[4] === 0) {
            this.setState(
              prevState => ({
                ...prevState,
                options: [this.state.options[0], this.state.options[1], this.state.options[2], 0]
              })
            )
          }
      });
  }

  showAnalytics() {
    if(this.stats[1] === 0 && this.stats[2] === 0 && this.stats[3] === 0 && this.stats[4] === 0) {
      return (
        <div>
          <p className="input-label analytics-question">{this.state.question}</p>
          <p className="poll-denied-detection">No Responses Recorded</p>
        </div>
      )
    } else {
      return (
        <div>
          <p className="input-label analytics-question">{this.state.question}</p>
          <ResponsiveContainer width="90%" height={250}>
            <PieChart>
              <Pie dataKey="angle"
                   isAnimationActive={true}
                   data={[{angle: this.stats[1], label: this.state.options[0], fill: "#8884d8"},
                          {angle: this.stats[2], label: this.state.options[1], fill: "#f95d6a"},
                          {angle: this.stats[3], label: this.state.options[2], fill: "#00C49F"},
                          {angle: this.stats[4], label: this.state.options[3], fill: "#ffc658"}]}
                   cx="50%" cy="50%"
                   nameKey="label"
                   innerRadius="0%"
                   outerRadius="100%">
                   <LabelList dataKey="label" position="outside"/>
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.showAnalytics()}
      </div>
    )
  }
}

export default PollAnalytics;
