import Users from './users'

export default {
  Query: {
    users(obj, args, { user }) {
      if(user){
          return Users.find({ userId: user._id }).fetch();
      }

      return []
    }
  },

  Mutation: {
    createUser(obj, { name }, { user }) {
      if(user){
          const newUserId = Users.insert({ name, userId: user._id });
          return Users.findOne(newUserId)
      }

      throw new Error("Unauthorized")
    }
  }
}
