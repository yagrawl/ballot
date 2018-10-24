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
  }

  componentDidMount() {
    fetch('/api/activity/analytics/' + this.state.id)
      .then(response => response.json())
      .then(data => {
          let stats = {1: 0, 2: 0, 3: 0, 4: 0 };

          for(let i = 0; i < data.details.length; i++) {
            if(data.details[0].selection === "1") {
              stats[1] += 1;
            }
            if(data.details[0].selection === "2") {
              stats[2] += 1;
            }
            if(data.details[0].selection === "3") {
              stats[3] += 1;
            }
            if(data.details[0].selection === "4") {
              stats[4] += 1;
            }
          }

          this.setState(
            prevState => ({
              ...prevState,
              opt_1: stats[1],
              opt_2: stats[2],
              opt_3: stats[3],
              opt_4: stats[4]
            })
          );
          console.log(this.state)
      });
  }

  render() {
    let stats = this.state;

    return (
      <div>
        <p className="input-label">Analytics</p>
        <RadialChart
          data={[{angle: stats.opt_1, label: this.state.options[0]},
                 {angle: stats.opt_2, label: this.state.options[1]},
                 {angle: stats.opt_3, label: this.state.options[2]},
                 {angle: stats.opt_4, label: this.state.options[3]}]}
          width={300}
          height={300}
        />
      </div>
    )
  }
}

export default PollAnalytics;
