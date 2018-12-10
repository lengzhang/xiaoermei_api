exports.Schema = `
  type _weapp_user {
    _id: ID
    open_id: String
    user: _user
    skey: String
    create_at: String
  }

  type weappLoginResult {
    skey: String
    success: Boolean!
  }
`

exports.Query = `
  getWeappUser(_id: String, open_id: String, skey: String): _weapp_user
  getWeappUsers(_id: String, open_id: String, skey: String): [_weapp_user]!
`

exports.Mutation = `
  weappLogin(code: String!, rawData: String, signature: String, encryptedData: String, iv: String): weappLoginResult!
`
