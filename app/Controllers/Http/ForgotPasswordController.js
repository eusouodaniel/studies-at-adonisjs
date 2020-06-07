'use strict'

const ForgotPasswordService = use('App/Services/ForgotPasswordService')

class ForgotPasswordController {
  async store ({ request }) {
    try {
      const email = request.input('email')

      await ForgotPasswordService.createToken(email)
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Internal server erro' } })
    }
  }

  async update ({ request, response }) {
    try {
      const data = request.only(['token','password'])

      const saveNewPassword = await ForgotPasswordService.update(data)

      if (saveNewPassword == 401) {
        return response.status(401).send({ error: { message: 'Invalid token' } })
      }
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Internal server erro' } })
    }
  }
}

module.exports = ForgotPasswordController
