exports.Schema = `
  type _account {
    _id: ID
    username: String
    password: String
    user: _user
    create_at: String
  }

`
/*
  type tokenResult {
    access_token: String
    expires: Float
  }
  */
exports.Query = `
  getAccount(_id: String!): _account
  getAccounts: [_account]!
  signIn(username: String, password: String): String
`

exports.Mutation = `
  signUp(username: String!, password: String!, nickname: String!, role: String!, avatar: String, gender: Int, brief: String, country: String, province: String, city: String): Boolean!

  updatePassword(password: String!, oldPassword: String!): Boolean!
`
