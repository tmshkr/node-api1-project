import React from "react";
import axios from "../utils/axios";
import { Button, Table, Spinner } from "reactstrap";
import "./Users.scss";

function Users(props) {
  const { history, users, getUsers } = props;

  const deleteUser = (id) => {
    axios
      .delete(`/api/users/${id}`)
      .then(() => {
        getUsers();
      })
      .catch((err) => console.dir(err));
  };

  if (!users.length) return <Spinner color="primary" />;

  return (
    <div className="users-list">
      <header>
        <Button color="primary" onClick={() => history.push("/users/add")}>
          Add User
        </Button>
        <h2>Users</h2>
      </header>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Bio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.bio}</td>
              <td>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => deleteUser(user.id)}
                >
                  delete
                </Button>
                <Button
                  size="sm"
                  onClick={() => history.push(`/users/edit/${user.id}`)}
                >
                  edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Users;
