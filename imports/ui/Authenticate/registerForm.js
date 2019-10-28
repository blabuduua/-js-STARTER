import React from 'react'

const RegisterForm = () => {
  let email
  let password

  handleRegisterUser = (e) => {
    e.preventDefault();

    Accounts.createUser({
      email: email.value,
      password: password.value
    }, error => { console.log('Success register', error) })

    email.value = ''
    password.value = ''
  }

  return (
    <form onSubmit={ handleRegisterUser }>
      <input type="email" name="email" ref={(input) => email = input} />
      <input type="password" name="password" ref={(input) => password = input} />
      <button>Register Me!</button>
    </form>
  )
}

export default RegisterForm
