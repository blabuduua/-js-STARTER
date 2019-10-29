import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from "apollo-boost"

const createUser = gql`
  mutation createUser($name: String!) {
    createUser(name: $name) {
      _id
    }
  }
`

const UserCreateForm = () => {
  let name;
  const [createUserFunction] = useMutation(createUser);

  handleAddUser = (e) => {
    e.preventDefault();
    name.value == '' ? console.log('Empty Name') : saveUser()
    name.value = ''
  }

  saveUser = () => {
    createUserFunction({
      refetchQueries: [
          "getUser"
      ],
      variables: {
          name: name.value
      }
    }).then(({ data }) => {
      console.log('data', data);
    }).catch(error => {
      console.log('error', error);
         // Unauthorized error.message for form validation and API control
    });
  }

  return (
    <form onSubmit={ handleAddUser }>
      <div className="col-md-4">
        <input placeholder="Название" className="form-control" type="text" ref={ (input) => name = input } />
      </div>
      <button className="btn btn-outline-primary">Submit</button>
    </form>
  )
}

export default UserCreateForm
