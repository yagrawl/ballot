import React, { Component } from 'react';

import TextBox from '../components/textbox';
import Logo from '../components/logo'

class Demo extends Component {
  state = {
    key: '',
    value: ''
  };

  render() {
    return (
        <div>
          <Logo link="./create"/>
          <div className="main-div-demo">
            <div className="split-demo left-demo">
              <div className="left-margin-demo">
                <form>
                  <TextBox
                    title={"Create"}
                    value={this.state.key}
                    name={"key"}
                    className={"input-box input-box-demo"}
                    // handleChange={this.handleTextArea}
                    placeholder={"Key"}
                  />
                  <TextBox
                    value={this.state.key}
                    name={"Value"}
                    className={"input-box input-box-demo"}
                    // handleChange={this.handleTextArea}
                    placeholder={"Value"}
                  />
                  <input className="button-black button-black-transparent
                    button-demo" type="submit" value="Create" />
                </form>

                <div className="divider clear-left-demo"></div>

                <form>
                  <TextBox
                    title={"Read"}
                    value={this.state.key}
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
                    value={this.state.key}
                    name={"key"}
                    className={"input-box input-box-demo"}
                    // handleChange={this.handleTextArea}
                    placeholder={"Key"}
                  />
                  <TextBox
                    value={this.state.key}
                    name={"Value"}
                    className={"input-box input-box-demo"}
                    // handleChange={this.handleTextArea}
                    placeholder={"Value"}
                  />
                  <input className="button-black button-black-transparent
                    button-demo" type="submit" value="Update" />
                </form>

                <div className="divider"></div>

                <form>
                  <TextBox
                    title={"Delete"}
                    value={this.state.key}
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
