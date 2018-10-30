import React, {Component} from 'react';

import TextBox from '../components/textbox';
import Toggle from '../components/toggle';

class PollAttributes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attributes: {
        creator_id: "",
        creation_time: "",
        expiration_time: "",
        feed_privacy: false,
        analytics_privacy: false,
        tags: [],
        ip_address: ""
      },
      duration: ""
    }

    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleFeedPrivacyChange = this.handleFeedPrivacyChange.bind(this);
    this.handleAnalyticsPrivacyChange = this.handleAnalyticsPrivacyChange.bind(this);
  }

  handleNext = (e) => {
    e.preventDefault()

    this.props.returnValues(this.state);
    this.props.nextStep();
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ ip_address: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/ip');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleDurationChange = (e) => {
    let value = e.target.value;
    this.setState(
      prevState => ({
        ...prevState,
        duration: value
      })
    );
  }

  handleFeedPrivacyChange() {
    this.setState(
      prevState => ({
        attributes: {
          ...prevState.attributes,
          feed_privacy: !prevState.attributes.feed_privacy
        }
      })
    );
  }

  handleAnalyticsPrivacyChange() {
    this.setState(
      prevState => ({
        attributes: {
          ...prevState.attributes,
          analytics_privacy: !prevState.attributes.analytics_privacy
        }
      })
    );
  }

  render() {
    return (
      <div>
        <form>
          <TextBox
            title={"Poll Duration"}
            className={"input-box input-box-option"}
            name={"duration"}
            value={this.state.duration}
            handleChange={this.handleDurationChange}
            type={"number"}
            placeholder={"Enter number of days you want the poll to be active"}
          />

          <div>
            <p className="input-label">Display your poll on feed?</p>
            <Toggle value={this.state.attributes.feed_privacy}
                  handleChange={this.handleFeedPrivacyChange} />
          </div>

          <div>
            <p className="input-label">Display analytics on your poll after vote?</p>
            <Toggle value={this.state.attributes.analtyics_privacy}
                  handleChange={this.handleAnalyticsPrivacyChange} />
          </div>

          <button className="button-black button-black-transparent"
            onClick={this.handleNext} >Create</button>
        </form>
      </div>
    );
  }
}

export default PollAttributes;
