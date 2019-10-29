import React from 'react'

const LoginForm = (props) => {
  let email
  let password

  handleLoginUser = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(
      email.value,
      password.value,
      error => {
        if(!error) {
          props.client.resetStore()
        }

        console.log('Success login', error)
       }
    )

    email.value = ''
    password.value = ''
  }

  return (
    <form onSubmit={ handleLoginUser }>
      <div className="col-md-4">
        <input placeholder="Email" className="form-control" type="email" name="email" ref={(input) => email = input} />
      </div>
      <div className="col-md-4">
        <input placeholder="Password" className="form-control" type="password" name="password" ref={(input) => password = input} />
      </div>
      <div className="col-md-4">
        <button className="btn btn-outline-primary">Login Me!</button>
      </div>
    </form>
  )
}

export default LoginForm
