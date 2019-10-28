import Users from './users'

export default {
  Query: {
    users() {
      return Users.find({}).fetch()
    }
  },

  Mutation: {
    createUser() {
      // const userId = Users.insert({
      //   name: 'Test MATRIX'
      // })
    }
  }
}
