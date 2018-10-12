import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import Habit from './habit'

class App extends Component {
  render() {
    return (
        <div className="bg-primary-color p-5 d-flex align-items-center hv-100vh">
          <div className="container d-flex">
              <Route exact path="/" component={Habit} />
          </div>
        </div>
    );
  }
}

export default App;
