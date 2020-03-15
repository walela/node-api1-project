import React, { useState } from 'react'
import Users from './Users'
import AddUserForm from './AddUserForm'
import EditUserForm from './EditUserForm'
import './app.css'

const App = () => {
  const [editing, setEditing] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const editUser = user => {
    const { id, name, bio } = user
    setEditing(true)
    setCurrentUser({ id, name, bio })
  }

  return (
    <div className='app'>
      <h1>User Dashboard</h1>
      <div className='content'>
        {editing ? (
          <EditUserForm
            setEditing={setEditing}
            currentUser={currentUser}
          />
        ) : (
          <AddUserForm />
        )}
        <Users editUser={editUser} />
      </div>
    </div>
  )
}

export default App
