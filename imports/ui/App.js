import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Accounts } from 'meteor/accounts-base'
import { Link } from "react-router-dom"

// Users
import UserCreateForm from './Users/userCreateForm'

// Authenticate
import LoginForm from './Authenticate/loginForm'
import RegisterForm from './Authenticate/registerForm'
import LogoutButton from './Authenticate/logoutButton'

const getUser = gql`
  query getUser{
    user{
      _id
    }
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
    <div className="container">
        <h1>{ data.hi }</h1>

        <Link to="/test">Test</Link>

        {/*Authenticate*/}
        { data.user._id ? (
          <div>
            <LogoutButton client={client} />

            { data.users.map((user, i) => (
                <li key={ user._id }>{ user.name }</li>
            )) }

            {/*Users*/}
            <UserCreateForm />
          </div>
        ) : (
          <div>
            <RegisterForm client={client} />
            <LoginForm client={client} />
          </div>
        )  }
    </div>
  )
}

export default App
