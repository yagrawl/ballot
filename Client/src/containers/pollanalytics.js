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
      });
  }

  render() {

    return (
      <div>
        <p className="input-label">Analytics</p>
        <RadialChart
          data={[{angle: this.stats[1], label: this.state.options[0]},
                 {angle: this.stats[2], label: this.state.options[1]},
                 {angle: this.stats[3], label: this.state.options[2]},
                 {angle: this.stats[4], label: this.state.options[3]}]}
          width={300}
          height={300}
        />
      </div>
    )
  }
}

export default PollAnalytics;
