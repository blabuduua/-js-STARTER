export default {
  Query: {
    user(obj, args, { user }) {
      if(user){
          return user
      }

      return {}
    }
  }
}
