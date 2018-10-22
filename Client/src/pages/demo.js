import React, { Component } from 'react';

import TextBox from '../components/textbox';
import Logo from '../components/logo'
import DataList from '../components/datalist';

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ckey: "",
      cvalue: "",
      rkey: "",
      ukey: "",
      uvalue: "",
      dkey: "",
      response: [{"key": "",
                  "value": ""}]
    };

    this.handleCreateKey = this.handleCreateKey.bind(this);
    this.handleCreateValue = this.handleCreateValue.bind(this);
    this.handleReadKey = this.handleReadKey.bind(this);
    this.handleUpdateKey = this.handleUpdateKey.bind(this);
    this.handleUpdateValue = this.handleUpdateValue.bind(this);
    this.handleDeleteKey = this.handleDeleteKey.bind(this);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleRead = this.handleRead.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  RefreshApi = async () => {
    const response = await fetch('/api/demo/table');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  ReadApi = async (url) => {
    const response = await fetch(url);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

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

  handleReadKey(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        ...prevState,
        rkey: value
      })
    );
  }

  handleUpdateKey(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        ...prevState,
        ukey: value
      })
    );
  }

  handleUpdateValue(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        ...prevState,
        uvalue: value
      })
    );
  }

  handleDeleteKey(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        ...prevState,
        dkey: value
      })
    );
  }

  handleCreate(e) {
    e.preventDefault();
    let data = this.state;

    fetch("/api/demo", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => {
      console.log(response);
    })
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));

    this.setState(
      prevState => ({
        ...prevState,
        ckey: '',
        cvalue: ''
      })
    );

    this.handleRefresh(e);
  };

  handleRead(e) {
    e.preventDefault();
    let data = this.state.rkey;
    let url = "/api/demo" + '?key=' + data;

    this.ReadApi(url)
    .then(res => {
      this.setState(
        prevState => ({
            ...prevState,
            response: res.result
        })
      );
      console.log(this.state)
    })
    .catch(err => console.log(err));

    this.setState(
      prevState => ({
        ...prevState,
        rkey: ''
      })
    );
  };

  handleUpdate(e) {
    e.preventDefault();
    let data = this.state;

    fetch("/api/demo", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    })
    .then(response => {
      console.log(response);
    })
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));

    this.setState(
      prevState => ({
        ...prevState,
        ukey: '',
        uvalue: ''
      })
    );

    this.handleRefresh(e);
  };

  handleDelete(e) {
    e.preventDefault();
    let data = this.state.dkey;
    let url = "/api/demo" + '?key=' + data;

    fetch(url, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    })
    .then(response => {
      console.log(response);
    })
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));

    this.setState(
      prevState => ({
        ...prevState,
        dkey: ''
      })
    );

    this.handleRefresh(e);
  };

  handleRefresh(e) {
    e.preventDefault();

    this.RefreshApi()
      .then(res => {
        this.setState(
          prevState => ({
              ...prevState,
              response: res.result
          })
        );
        console.log(this.state)
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
        <div onLoad={this.handleRefresh}>
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

                <form onSubmit={this.handleRead}>
                  <TextBox
                    title={"Read"}
                    value={this.state.rkey}
                    name={"key"}
                    className={"input-box input-box-demo"}
                    handleChange={this.handleReadKey}
                    placeholder={"Key"}
                  />
                  <input className="button-black button-black-transparent
                    button-demo" type="submit" value="Read" />
                </form>

                <div className="divider clear-left-demo"></div>

                <form onSubmit={this.handleUpdate}>
                  <TextBox
                    title={"Update"}
                    value={this.state.ukey}
                    name={"key"}
                    className={"input-box input-box-demo"}
                    handleChange={this.handleUpdateKey}
                    placeholder={"Key"}
                  />
                  <TextBox
                    value={this.state.uvalue}
                    name={"Value"}
                    className={"input-box input-box-demo input-box-second-demo"}
                    handleChange={this.handleUpdateValue}
                    placeholder={"Value"}
                  />
                  <input className="button-black button-black-transparent
                    button-demo" type="submit" value="Update" />
                </form>

                <div className="divider clear-left-demo"></div>

                <form onSubmit={this.handleDelete}>
                  <TextBox
                    title={"Delete"}
                    value={this.state.dkey}
                    name={"key"}
                    className={"input-box input-box-demo"}
                    handleChange={this.handleDeleteKey}
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
                  <p className="heading-demo input-box-demo">Database</p>
                  <form onSubmit={this.handleRefresh}>
                    <input className="button-black button-black-transparent button-demo"
                    type="submit" value="Refresh"/>
                  </form>
                  <DataList data={this.state.response} />
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Demo;
