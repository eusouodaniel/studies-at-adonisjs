'use strict'

const User = use('App/Models/User')

class UserService {
  async create (data) {
    const user = await User.create(data)

    return user
  }
}

module.exports = UserService
