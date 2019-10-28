import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Accounts } from 'meteor/accounts-base'

// Users
import UserCreateForm from './Users/userCreateForm'

// Authenticate
import LoginForm from './Authenticate/loginForm'
import RegisterForm from './Authenticate/registerForm'
import LogoutButton from './Authenticate/logoutButton'

const getUser = gql`
  query getUser{
    hi
    users {
      _id
      name
    }
  }
`;

const App = () => {
  const { loading, error, data, client } = useQuery(getUser);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error :(</span>;

  return (
    <div>
      <h1>{ data.hi }</h1>

      {/*Authenticate*/}
      <LogoutButton client={client} />
      <RegisterForm client={client} />
      <LoginForm client={client} />

      <ul>
        { data.users.map(user => (
          <li key={ user._id }>{ user.name }</li>
        )) }
      </ul>

      {/*Users*/}
      <UserCreateForm />
    </div>
  )
}

export default App
