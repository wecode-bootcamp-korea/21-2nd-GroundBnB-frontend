import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import Routes from './Routes';
import GlobalStyle from './Styles/GlobalStyle';
import mixin from './Styles/mixin';
import theme from './Styles/theme';

ReactDOM.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={{ ...theme, ...mixin }}>
      <Routes />
    </ThemeProvider>
  </>,
  document.getElementById('root'),
);
