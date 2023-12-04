import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home/index.jsx';

global.React = React;
ReactDOM.render(
  <Home />,
  document.getElementById('app')
);
