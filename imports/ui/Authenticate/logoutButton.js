import React from 'react'

const LogoutButton = (props) => {
  handleLogoutUser = (e) => {
    e.preventDefault();

    Meteor.logout((error) => {
      if(!error) {
        props.client.resetStore();
      }

      console.log(error);
    });
  }

  return (
    <button className="btn btn-outline-primary" onClick={ handleLogoutUser }>Logout Me!</button>
  )
}

export default LogoutButton
