import { Mongo } from 'meteor/mongo'

// const Users = Meteor.users
const Users = new Mongo.Collection('test')

export default Users
