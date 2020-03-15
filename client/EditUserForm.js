import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EditUserForm = ({ currentUser, setEditing }) => {
  const [user, setUser] = useState(currentUser)

  useEffect(() => {
    setUser(currentUser)
  }, [currentUser])

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleUpdate = id => {
    axios
      .put(`http://localhost:4040/api/users/${id}`, user)
      .then(console.log, console.error)
    setEditing(false)
  }

  return (
    <div className='edit-form'>
      <input
        type='text'
        name='name'
        placeholder='Name'
        value={user.name}
        onChange={handleChange}
      />
      <textarea
        name='bio'
        id='bio'
        placeholder='Bio'
        value={user.bio}
        onChange={handleChange}></textarea>
      <button onClick={() => handleUpdate(user.id)}>Update</button>
    </div>
  )
}

export default EditUserForm
