import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Users = props => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:4040/api/users').then(res => setUsers(res.data))
  }, [users])

  const deleteUser = id => {
    axios
      .delete(`http://localhost:4040/api/users/${id}`)
      .then(console.log, console.error)
  }

  return (
    <div className='user-table'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Bio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.bio}</td>
                <td>
                  <button onClick={() => props.editUser(user)}>Edit</button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
