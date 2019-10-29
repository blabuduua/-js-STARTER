import React from 'react'

const RegisterForm = (props) => {
  let email
  let password

  handleRegisterUser = (e) => {
    e.preventDefault();

    Accounts.createUser({
      email: email.value,
      password: password.value
    }, error => {
      if(!error) {
        props.client.resetStore()
      }

      console.log('Success register', error)
     })

    email.value = ''
    password.value = ''
  }

  return (
    <form onSubmit={ handleRegisterUser }>
      <div className="col-md-4">
        <input placeholder="Email" className="form-control" type="email" name="email" ref={(input) => email = input} />
      </div>
      <div className="col-md-4">
        <input placeholder="Password" className="form-control" type="password" name="password" ref={(input) => password = input} />
      </div>
      <div className="col-md-4">
        <button className="btn btn-outline-primary">Register Me!</button>
      </div>
    </form>
  )
}

export default RegisterForm
