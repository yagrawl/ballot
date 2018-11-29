import React, {Component} from 'react';

import { RadialChart } from 'react-vis';

import '../../node_modules/react-vis/dist/style.css';

class PollEmbedAnalytics extends Component {
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
      options: this.props.options,
      labels: [],
      angles: []
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

          let angle = [this.stats[1],
                       this.stats[2],
                       this.stats[3],
                       this.stats[4]];

          let labels = [this.state.options[0] + ' : ' + this.stats[1],
                        this.state.options[1] + ' : ' + this.stats[2],
                        this.state.options[2] + ' : ' + this.stats[3],
                        this.state.options[3] + ' : ' + this.stats[4]];

          if(this.stats[1] === 0) {
            angle[0] = '';
            labels[0] = '';
          }

          if(this.stats[2] === 0) {
            angle[1] = '';
            labels[1] = '';
          }

          if(this.stats[3] === 0) {
            angle[2] = '';
            labels[2] = '';
          }

          if(this.stats[4] === 0) {
            angle[3] = '';
            labels[3] = '';
          }

          this.setState(
            prevState => ({
              ...prevState,
              angles: angle,
              labels: labels
            })
          )
      });
  }

  showAnalytics() {
      return (
        <RadialChart
          data={[{angle: this.state.angles[0], label: this.state.labels[0], color: "#0088FE"},
                 {angle: this.state.angles[1], label: this.state.labels[1], color: "#FF8042"},
                 {angle: this.state.angles[2], label: this.state.labels[2], color: "#00C49F"},
                 {angle: this.state.angles[3], label: this.state.labels[3], color: "#FFBB28"}]}
          width={250}
          height={250}
          animation={true}
          showLabels={true}
          labelsRadiusMultiplier={0.80}
          labelsStyle={{
            fontSize: 16,
            fontFamily: "Proxima Nova",
            fontWeight: 200,
            fill: "white"
          }}
          colorType={'literal'}
          colorDomain={[0, 100]}
          colorRange={[0, 10]}
          radius={120}
          padAngle={0.00}
        />
      )
  }

  render() {
    return (
      <div>
        {this.showAnalytics()}
      </div>
    )
  }
}

export default PollEmbedAnalytics;
