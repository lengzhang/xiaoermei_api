exports.Schema = `
  type _TestTwo {
    _id: String
    create_at: String
    context: String
  }

  type addTestTwo {
    success: Boolean
  }
`

exports.Query = `
  testTwos: [_TestTwo]
`

exports.Mutation = `
  addTestTwo(context: String!): addTestOne
`
