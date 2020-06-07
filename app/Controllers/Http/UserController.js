'use strict'

const UserService = use('App/Services/UserService')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await UserService.create(data)

    return user
  }
}

module.exports = UserController
