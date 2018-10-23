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
        analtyics_privacy: false,
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
            placeholder={"Enter number of hours"}
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
