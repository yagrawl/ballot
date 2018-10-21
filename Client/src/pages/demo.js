import React, { Component } from 'react';

import TextBox from '../components/textbox';
import Logo from '../components/logo'

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ckey: "",
      cvalue: "",
      rkey: "",
      ukey: "",
      uvalue: "",
      dkey: ""
    };

    this.handleCreateKey = this.handleCreateKey.bind(this);
    this.handleCreateValue = this.handleCreateValue.bind(this);

    this.handleCreate = this.handleCreate.bind(this);
  }

  handleCreateKey(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        ...prevState,
        ckey: value
      })
    );
  }

  handleCreateValue(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        ...prevState,
        cvalue: value
      })
    );
  }

  handleCreate(e) {
    e.preventDefault();
    let data = this.state;
    alert(data.ckey);

    fetch("/api/demo", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  };

  render() {
    return (
        <div>
          <Logo link="./create"/>
          <div className="main-div-demo">
            <div className="split-demo left-demo">
              <div className="left-margin-demo">
                <form onSubmit={this.handleCreate}>
                  <TextBox
                    title={"Create"}
                    value={this.state.ckey}
                    name={"key"}
                    className={"input-box input-box-demo"}
                    handleChange={this.handleCreateKey}
                    placeholder={"Key"}
                  />
                  <TextBox
                    value={this.state.cvalue}
                    name={"Value"}
                    className={"input-box input-box-demo input-box-second-demo"}
                    handleChange={this.handleCreateValue}
                    placeholder={"Value"}
                  />
                  <input className="button-black button-black-transparent
                    button-demo" type="submit" value="Create" />
                </form>

                <div className="divider clear-left-demo"></div>

                <form>
                  <TextBox
                    title={"Read"}
                    value={this.state.rkey}
                    name={"key"}
                    className={"input-box input-box-demo"}
                    // handleChange={this.handleTextArea}
                    placeholder={"Key"}
                  />
                  <input className="button-black button-black-transparent
                    button-demo" type="submit" value="Read" />
                </form>

                <div className="divider clear-left-demo"></div>

                <form>
                  <TextBox
                    title={"Update"}
                    value={this.state.ukey}
                    name={"key"}
                    className={"input-box input-box-demo"}
                    // handleChange={this.handleTextArea}
                    placeholder={"Key"}
                  />
                  <TextBox
                    value={this.state.uvalue}
                    name={"Value"}
                    className={"input-box input-box-demo input-box-second-demo"}
                    // handleChange={this.handleTextArea}
                    placeholder={"Value"}
                  />
                  <input className="button-black button-black-transparent
                    button-demo" type="submit" value="Update" />
                </form>

                <div className="divider clear-left-demo"></div>

                <form>
                  <TextBox
                    title={"Delete"}
                    value={this.state.dkey}
                    name={"key"}
                    className={"input-box input-box-demo"}
                    // handleChange={this.handleTextArea}
                    placeholder={"Key"}
                  />
                  <input className="button-black button-black-transparent
                    button-demo" type="submit" value="Delete" />
                </form>

              </div>
            </div>
            <div className="split-demo right-demo">
              <div className="right-content">
                <div className="left-margin-demo">
                  <p className="heading-demo">Database</p>
                </div>
              </div>
            </div>
          </div>
        </div>

    );
  }
}

export default Demo;
