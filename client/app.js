import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import './app.css'

const AddForm = () => {
  const initialFormData = { name: '', bio: '' }
  const [userForm, setUserForm] = useState(initialFormData)

  const handleChange = e => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post('http://localhost:4040/api/users', userForm)
      .then(console.log, console.error)
      .finally(setUserForm(initialFormData))
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

      <button onClick={handleSubmit}>ADD</button>
    </div>
  )
}

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios('http://localhost:4040/api/users/').then(
      res => setUsers(res.data),
      console.error
    )
  }, [users])

  function deleteUser(id) {
    axios
      .delete(`http://localhost:4040/api/users/${id}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })
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
            </div>
          )
        })}
      </div>
      <AddForm />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
