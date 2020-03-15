import React from 'react'
import axios from 'axios'

const AddUserForm = () => {
  const initialFormData = { name: '', bio: '' }
  const [user, setUser] = React.useState(initialFormData)

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post('http://localhost:4040/api/users', user)
      .then(console.log, console.error)
    setUser(initialFormData)
  }

  return (
    <div className='form'>
      <input
        type='text'
        name='name'
        placeholder='Name'
        value={user.name}
        onChange={handleChange}
      />
      <br />
      <textarea
        name='bio'
        id='bio'
        placeholder='Bio'
        value={user.bio}
        onChange={handleChange}></textarea>
      <br />
      <button onClick={handleSubmit}>Add User</button>
    </div>
  )
}

export default AddUserForm
