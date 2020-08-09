import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/">
                  <Login />
              </Route>
              <Route path="/register">
                  <Register />
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
