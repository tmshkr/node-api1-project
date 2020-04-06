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
  const getUsers = () => {
    axios
      .get("/api/users")
      .then(({ data }) => setUsers(data))
      .catch((err) => console.dir(err));
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Router>
      <main className="App">
        <Switch>
          <Route
            path="/users"
            render={(props) => (
              <Users {...props} users={users} getUsers={getUsers} />
            )}
          />
          <Redirect to="/users" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
