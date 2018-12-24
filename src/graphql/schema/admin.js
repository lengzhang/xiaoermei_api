exports.Schema = `
  type _admin {
    _id: ID
    deposit_rate: Int
    last_update_at: String
    create_at: String
  }
`

exports.Query = `
  getAdmin: _admin!
`

exports.Mutation = `
  updateAdmin(deposit_rate: Int): _result!
`
