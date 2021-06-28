import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './Styles/GlobalStyle';
import Routes from './Routes';
import theme from './Styles/theme';
import mixin from './Styles/mixin';

ReactDOM.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={{ ...theme, ...mixin }}>
      <Routes />
    </ThemeProvider>
  </>,
  document.getElementById('root'),
);
