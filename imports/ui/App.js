import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from "apollo-boost"

const getUser = gql`
  {
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
      <ul>
        { data.users.map(user => (
          <li key={ user._id }>{ user.name }</li>
        )) }
      </ul>
    </div>
  )
}

export default App
