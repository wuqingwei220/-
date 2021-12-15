import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import {BrowserRouter} from 'react-router-dom'
import store from './redux/store';

import App from './App'

ReactDom.render(
      <Provider store={store}>
         <BrowserRouter>
            <App></App>
         </BrowserRouter>
      </Provider>
,document.getElementById("root"))