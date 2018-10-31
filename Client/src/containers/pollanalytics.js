import React, {Component} from 'react';

import { RadialChart } from 'react-vis';
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
          console.log('Stats Up: ', this.stats);
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

  render() {

    return (
      <div>
        <p className="input-label analytics-question">{this.state.question}</p>
        <RadialChart
          data={[{angle: this.stats[1], label: this.state.options[0], color: "#0088FE"},
                 {angle: this.stats[2], label: this.state.options[1], color: "#FF8042"},
                 {angle: this.stats[3], label: this.state.options[2], color: "#00C49F"},
                 {angle: this.stats[4], label: this.state.options[3], color: "#FFBB28"}]}
          width={300}
          height={300}
          animation={true}
          showLabels={true}
          labelsRadiusMultiplier={0.86}
          labelsStyle={{
            fontSize: 14,
            fontFamily: "Proxima Nova",
            fontWeight: 200,
            fill: "#282C34"
          }}
          colorType={'literal'}
          colorDomain={[0, 100]}
          colorRange={[0, 10]}
          innerRadius={0}
          radius={140}
          padAngle={0.0}
        />
      </div>
    )
  }
}

export default PollAnalytics;
