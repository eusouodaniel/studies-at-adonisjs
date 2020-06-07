'use strict'

const Schema = use('Schema')

class AddTokenInUserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.string('token')
      table.timestamp('token_create_at')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('token')
      table.dropColumn('token_create_at')
    })
  }
}

module.exports = AddTokenInUserSchema
