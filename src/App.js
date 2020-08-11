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
import Dashboard from "./components/Dashboard";

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
              <Route path="/:restaurant/dashboard">
                  <Dashboard />
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
