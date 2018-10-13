import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';

import Index from './pages/index';
import Create from './pages/create';
import Poll from './pages/poll';
import List from './pages/list'
import NotFound from './pages/notfound';

class Routes extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Index}/>
          <Route path="/create" component={Create}/>
          <Route path="/poll/:poll_id" component={Poll}/>
          <Route path="/list" component={List}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default Routes;
