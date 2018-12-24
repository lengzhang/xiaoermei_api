exports.Schema = `
  type _comment {
    _id: ID
    relate_type: String
    relate_id: ID
    from: _user
    rating: Int
    comment: String
    last_update_at: String
    create_at: String
  }
`

exports.Query = `
  getComment(_id: ID!): _comment
  getComments(relate_type: String, relate_id: ID, from: ID): [_comment]
`

exports.Mutation = `
  addComment(relate_type: String!, relate_id: ID!, rating: Int!, comment: String!): _result!
  updateComment(_id: ID!, rating: Int, comment: String): _result!
  removeComments(ids: [ID!]): [_result!]!
`
