exports.Schema = `
  type _photo {
    _id: ID
    house: ID
    key: String
    url: String
    create_at: String
  }
`

exports.Query = ``

exports.Mutation = `
  addCover(house: ID!, key: String!): _result!
  removeCover(house: ID!): _result!

  addPhotos(house: ID!, keys: [String!]): [_result!]!
  removePhotos(house: ID!, ids: [ID!]): [_result!]!
`
