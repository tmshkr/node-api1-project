import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./components/Users";

function App() {
  return (
    <Router>
      <main className="App">
        <Switch>
          <Route path="/users" component={Users} />
          <Redirect to="/users" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
