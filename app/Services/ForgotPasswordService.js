'use strict'

const crypto = require('crypto')
const moment = require('moment')
const Mail = use('Mail')
const User = use('App/Models/User')

class ForgotPasswordService {
  async createToken (email) {
      const user = await User.findByOrFail("email", email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        ['emails.forgot_password'],
        { email, token: user.token, link: `${request.input('redirect_url')}?token=${user.token}` },
        message => {
          message
            .to(user.mail)
            .from(Env.get('SMTP_FROM_EMAIL'), Env.get('SMTP_FROM_NAME'))
            .subject("Recuperação de senha")
        }
      )
  }

  async update (data) {
    await User.findByOrFail(data.token);

    const tokenExpired = moment()
      .subtrack('2','days')
      .isAfter(user.token_created_at)

    if (tokenExpired) {
      return 401
    }

    user.token = null
    user.token_created_at = null
    user.password = password

    await user.save()
  }
}

module.exports = ForgotPasswordService
