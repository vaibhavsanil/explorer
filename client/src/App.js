// import logo from "./logo.svg";
import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

// Import Components
import Welcome from "./components/Welcome/Welcome-component";
import Explorer from "./components/Explorer/Explorer-component";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome} />

        <Route exact path="/explorer" component={Explorer} />
      </Switch>
    </Router>
  );
}

export default App;
