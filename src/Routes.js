import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Detail from './Pages/Detail/Detail';
import Result from './Pages/Result/Result';
import Main from './Pages/Main/Main';
import GlobalStyle from './Styles/GlobalStyle';
import theme from './Styles/theme';

function Routes() {
  return (
    <GlobalStyle>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/main" component={Main} />
            <Route exact path="/result" component={Result} />
            <Route exact path="/detail" component={Detail} />
          </Switch>
        </Router>
      </ThemeProvider>
    </GlobalStyle>
  );
}

export default Routes;
