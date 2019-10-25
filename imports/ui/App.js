import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from "apollo-boost"

const getUser = gql`
  {
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
      { data.users.map(user => (
        <h1>{ user.name }</h1>
      )) }
    </div>
  )
}

export default App
