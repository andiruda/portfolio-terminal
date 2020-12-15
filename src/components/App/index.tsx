import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/** Components */
import Nav from '../Nav';
import Terminal from '../Terminal';

import './index.css';

function App() {
  return (
    <div  className="App">
      <Router>
        <Nav activeItem={window.location.pathname} />
        <div className="App-body">
          <Switch>
            {/*  You have to have the 'exact' prop in there */}
            <Route exact path="/" component={Terminal} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
