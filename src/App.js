import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import {Container} from "react-bootstrap";
import Register from "./components/Register";

function App() {
  return (
    <Container fluid className="App-container">
      <Register />
    </Container>
  );
}

export default App;
