exports.Schema = `
  type _weapp_user {
    _id: ID
    open_id: String
    user: _user
    last_login_at: String
    create_at: String
  }

  type weappLoginResult {
    access_token: String
    success: Boolean!
  }
`

exports.Query = `
  getWeappUser(_id: String, open_id: String): _weapp_user
  getWeappUsers(_id: String, open_id: String): [_weapp_user]!
`

exports.Mutation = `
  weappLogin(code: String!, rawData: String, signature: String, encryptedData: String, iv: String): weappLoginResult!
`
