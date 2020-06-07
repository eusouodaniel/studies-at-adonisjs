'use strict'

const crypto = require('crypto')
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
}

module.exports = ForgotPasswordService
