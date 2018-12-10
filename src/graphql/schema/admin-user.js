exports.Schema = `
  type _admin_user {
    _id: ID
    username: String
    password: String
    user: _user
    create_at: String
  }

  type tokenResult {
    access_token: String
    expires: Float
  }
`

exports.Query = `
  getAdminUser(_id: String!): _admin_user
  getAdminUsers: [_admin_user]!
  adminLogin(username: String, password: String): tokenResult
`

exports.Mutation = `
  adminRegister(username: String!, password: String!, nickname: String!, avatar: String, gender: Int, brief: String, country: String, province: String, city: String): Boolean!
`
