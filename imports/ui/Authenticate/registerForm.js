import React from 'react'

const RegisterForm = () => {
  let login
  let password

  handleRegisterUser = (e) => {
    e.preventDefault();
    console.log('Registered!');
  }

  return (
    <form onSubmit={ handleRegisterUser }>
      <input type="text" name="login" ref={(input) => login = input} />
      <input type="password" name="password" ref={(input) => password = input} />
      <button>Register Me!</button>
    </form>
  )
}

export default RegisterForm
