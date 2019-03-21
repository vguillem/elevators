import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPage from '../LandingPage/LandingPage';
import Admin from '../Admin/Admin';
import Header from '../Header/Header';

class App extends Component {
  render() {
    return (
      <div>
      <Router>
        <Header />
        <Route path="/" exact component={LandingPage} />
        <Route path="/admin" exact component={Admin} />
      </Router>
    </div>
    )
  }
}

export default App;
