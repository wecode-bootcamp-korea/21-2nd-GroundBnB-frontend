import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Detail from './Pages/Detail/Detail';
import Result from './Pages/Result/Result';
import Main from './Pages/Main/Main';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/main" component={Main} />
        <Route exact path="/result" component={Result} />
        <Route exact path="/detail" component={Detail} />
      </Switch>
    </Router>
  );
}

export default Routes;
