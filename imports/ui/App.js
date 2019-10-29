import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Accounts } from 'meteor/accounts-base'
import { Link } from "react-router-dom";

import { List, ListItem, Paper } from '@material-ui/core'

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
    <div style={{ maxWidth: 1200, margin: 'auto', padding: 10 }}>
      <Paper>
        <h1>{ data.hi }</h1>

        <Link to="/test">Test</Link>

        {/*Authenticate*/}
        { data.user._id ? (
          <div>
            <LogoutButton client={client} />

            <List>
              { data.users.map(user => (
                <ListItem key={ user._id }>{ user.name }</ListItem>
              )) }
            </List>

            {/*Users*/}
            <UserCreateForm />
          </div>
        ) : (
          <div>
            <RegisterForm client={client} />
            <LoginForm client={client} />
          </div>
        )  }
      </Paper>
    </div>
  )
}

export default App
