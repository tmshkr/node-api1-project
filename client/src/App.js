import React, { useEffect, useState } from "react";
import axios from "./utils/axios";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./components/Users";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("/api/users")
      .then(({ data }) => setUsers(data))
      .catch((err) => console.dir(err));
  }, []);
  return (
    <Router>
      <main className="App">
        <Switch>
          <Route
            path="/users"
            render={(props) => (
              <Users {...props} handleUsers={[users, setUsers]} />
            )}
          />
          <Redirect to="/users" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
