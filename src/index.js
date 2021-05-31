import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.min.css";

import Routes from "./routes.tsx";
import reportWebVitals from './reportWebVitals';
import './index.css';

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);

reportWebVitals();
