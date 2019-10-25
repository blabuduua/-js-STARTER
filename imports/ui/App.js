import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from "apollo-boost"

const getHi = gql`
  query Hi{
    hi
  }
`;

const App = () => {
  const { loading, error, data, client } = useQuery(getHi);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error :(</span>;

  return (
    <h1>{ data.hi }</h1>
  )
}

export default App
