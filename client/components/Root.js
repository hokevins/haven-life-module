import React from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Home from './Home';

class Root extends React.Component {
  render () {
    return (
      <Router>
        <div id="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Root;
