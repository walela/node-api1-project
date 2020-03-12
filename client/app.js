import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './app.css';

const AddForm = ({ setUsers, setEditing, editing, userID, users }) => {
  const initialFormData = { name: '', bio: '' };
  const [userForm, setUserForm] = useState(initialFormData);

  useEffect(() => {
    if (editing) {
      const editedUser = userID && users && users.find(u => u.id === userID);
      setUserForm({ name: editedUser.name, bio: editedUser.bio });
    }
  }, [editing]);

  const handleChange = e => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editing) {
      editUser(userID, userForm);
      setEditing(false);
    } else {
      axios
        .post('http://localhost:4040/api/users', userForm)
        .then(console.log, console.error)
        .finally(setUserForm(initialFormData));
    }
  };

  function editUser(id, userDetails) {
    axios
      .put(`http://localhost:4040/api/users/${id}`, userDetails)
      .then(res => {
        setUsers(
          users.map(user => {
            if (user.id === res.data.id) {
              return res.data;
            }
            return user;
          })
        );
        setUserForm(initialFormData);
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }
  return (
    <div className='userForm'>
      <label>
        <input
          placeholder='Name'
          name='name'
          value={userForm.name}
          onChange={handleChange}
        />
      </label>
      <label>
        <textarea
          placeholder='Bio'
          name='bio'
          value={userForm.bio}
          onChange={handleChange}
        />
      </label>

      <button onClick={handleSubmit}>{editing ? 'EDIT' : 'ADD'}</button>
    </div>
  );
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState({
    currState: false,
    userID: 0
  });

  useEffect(() => {
    axios('http://localhost:4040/api/users/').then(
      res => setUsers(res.data),
      console.error
    );
  }, []);

  function deleteUser(id) {
    axios
      .delete(`http://localhost:4040/api/users/${id}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <div className='App'>
      <h1>User Dashboard</h1>
      <div className='users'>
        {users.map(user => {
          return (
            <div key={user.id} className='user'>
              <h2>{user.name}</h2>
              <p>{user.bio}</p>
              <button onClick={() => deleteUser(user.id)}>DELETE</button>
              <button
                onClick={() =>
                  setEditing({ ...editing, currState: true, userID: user.id })
                }
              >
                EDIT
              </button>
            </div>
          );
        })}
      </div>
      <AddForm
        setEditing={setEditing}
        editing={editing}
        userID={editing.userID}
        users={users}
        setUsers={setUsers}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
