exports.Schema = `
  type _account {
    _id: ID
    username: String
    password: String
    user: _user
    create_at: String
  }

  type token {
    access_token: String
    role: String
  }
`
/*
  type tokenResult {
    access_token: String
    expires: Float
  }
  */
exports.Query = `
  getAccount(_id: ID!): _account
  getAccounts: [_account]!
  signIn(username: String, password: String): token!
`

exports.Mutation = `
  signUp(username: String!, password: String!, nickname: String!, role: String!, avatar: String, gender: Int, brief: String, country: String, province: String, city: String): _result!

  updatePassword(password: String!, oldPassword: String!): _result!
`
