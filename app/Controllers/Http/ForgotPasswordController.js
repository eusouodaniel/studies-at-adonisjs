'use strict'

const ForgotPasswordService = use('App/Services/ForgotPasswordService')

class ForgotPasswordController {
  async store ({ request }) {
    try {
      const email = request.input('email');

      await ForgotPasswordService.createToken(email);
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Internal server erro' } });
    }
  }
}

module.exports = ForgotPasswordController
