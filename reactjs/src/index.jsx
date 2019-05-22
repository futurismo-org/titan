import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import DashBoard from "./components/organisms/DashBoard";

/* eslint-disable */
ReactDOM.render(
  <Router>
    <DashBoard />
  </Router>,
  document.getElementById('root')
);
