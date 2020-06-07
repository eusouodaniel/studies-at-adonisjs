'use strict'

const crypto = require('crypto')
const User = use('App/Models/User')

class ForgotPasswordService {
  async createToken (email) {
      const user = await User.findByOrFail("email", email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()
  }
}

module.exports = ForgotPasswordService
