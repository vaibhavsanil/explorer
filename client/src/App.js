// import logo from "./logo.svg";
import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

// Import Components
import Welcome from "./components/Welcome/Welcome-component";
import Explorer from "./components/Explorer/Explorer-component";
import NotFound from "./components/Explorer/NotFound-component";

// Import Context API State
import DebateState from "./context/Debates/DebateState";

function App() {
  //   Axios Cancel Requests https://dev.to/collegewap/cancelling-previous-requests-in-search-bar-using-axios-in-react-3nef

  //  https://reactjsexample.com/a-react-primitive-for-building-slim-progress-bars/
  return (
    <DebateState>
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome} />

          <Route path="/explorer" component={Explorer} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </DebateState>
  );
}

export default App;
