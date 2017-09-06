import React from 'react';
import ReactDOM from 'react-dom';
import Styles from './styles/style.css';
import { AppContainer } from 'react-hot-loader';
import App from './components/app';

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/app', () => {
    const NextApp = require('./components/app').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
