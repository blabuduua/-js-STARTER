import Users from './users'

export default {
  Query: {
    users() {
      return Users.find({}).fetch()
    }
  },

  Mutation: {
    createUser(obj, { name }, context) {
      const userId = Users.insert({ name })
      return Users.findOne(userId)
    }
  }
}
