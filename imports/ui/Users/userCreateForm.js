import React, { Component } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from "apollo-boost"

class UserCreateForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name : "",
      error : ""
     };
  }

  submitForm = () => {
    let name = this.state.name.value

    name === '' ?
      this.setState({error: 'Error!'}) :
      this.setState({error: 'Succes!'})

    console.log(name);

    // Чистим ввод
    this.state.name.value = ''
  }

  render() {
    return (
      <div>
        <input type="text" ref={ (input) => this.state.name = input } />
        { this.state.error }
        <button onClick={ this.submitForm }>Submit</button>
      </div>
    )
  }
}

export default UserCreateForm
