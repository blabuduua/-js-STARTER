import React from 'react'

const LoginForm = () => {
  let email
  let password

  handleLoginUser = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(
      email.value,
      password.value,
      error => { console.log('Success login', error) }
    )

    email.value = ''
    password.value = ''
  }

  return (
    <form onSubmit={ handleLoginUser }>
      <input type="email" name="email" ref={(input) => email = input} />
      <input type="password" name="password" ref={(input) => password = input} />
      <button>Login Me!</button>
    </form>
  )
}

export default LoginForm