import Users from './users'

// Users.insert({
//   name: 'Test MATRIX'
// })

export default {
  Query: {
    users() {
      return Users.find({}).fetch()
    }
  }
}
