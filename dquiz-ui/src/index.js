/* eslint-disable no-undef, react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

// Scenes Import
import Home from './scenes/home/Home';
import Host from './scenes/host/Host';
import Participant from './scenes/participant/Participant';

import store from './store';
import 'typeface-roboto';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Route exact path="/" component={Home} />
    <Route path="/host" component={Host} />
    <Route path="/participant" component={Participant} />
  </React.Fragment>
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
