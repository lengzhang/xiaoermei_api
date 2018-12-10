exports.Schema = `
  type _TestOne {
    _id: String
    context: String
    create_at: String
    test_two: [_TestTwo]
  }

  type addTestOne {
    success: Boolean
  }
`

exports.Query = `
  testOnes: [_TestOne]
`

exports.Mutation = `
  addTestOne(context: String!, subContext: String!): addTestOne
  addTestTwoInOne(_id: String!, context: String!): addTestOne
`
