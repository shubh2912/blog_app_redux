import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Components/Router';
import { Provider } from 'react-redux';
import store from './Store/store';

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>
  ,
  document.getElementById('root')
);


