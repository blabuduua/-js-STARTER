import Users from './users'

export default {
  Query: {
    users(obj, args, context) {
      console.log(context.user._id);
      return Users.find({}).fetch()
    }
  },

  Mutation: {
    createUser(obj, { name }, context) {
      console.log(context.user._id);
      const userId = Users.insert({ name })
      return Users.findOne(userId)
    }
  }
}
