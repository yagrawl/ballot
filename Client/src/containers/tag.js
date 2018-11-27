import React, {Component} from 'react';

class Tag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.poll_id,
      response: [{
        tag: '',
      }],
    }
  }

  componentDidMount() {
    console.log(this.state.id);
    fetch('/api/poll/tag/' + this.state.id)
      .then(response => response.json())
      .then(data => {
        if(data.details.length === 0) {
          this.setState(
            prevState => ({
              ...prevState,
              response: [{'tag': 'Misc'}]
            })
          );
        } else {
          this.setState(
            prevState => ({
              ...prevState,
              response: data.details
            })
          );
        }

    });
  }

  render() {
    return <span className="tag">{this.state.response[0].tag}</span>
  }
}

export default Tag;
