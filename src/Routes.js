import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Detail from './Pages/Detail/Detail';
import Result from './Pages/Result/Result';
import Main from './Pages/Main/Main';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';

function Routes() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/main" component={Main} />
        <Route exact path="/result" component={Result} />
        <Route exact path="/detail/:id" component={Detail} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default Routes;
