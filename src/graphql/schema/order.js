exports.Schema = `
  type _order {
    _id: ID
    user: _user
    house: _house
    price: Float
    from: String
    to: String
    message: String
    deposit: Float
    deposit_received: Boolean
    discount_rate: Int
    confirm: Boolean
    confirm_at: String
    create_at: String
  }
`

exports.Query = `
  getOrder(_id: ID!): _order
  getOrders(user: ID, house: ID, price: Float, from: String, to: String, message: String, deposit: Float, deposit_received: Boolean, discount_rate: Int, confirm: Boolean): [_order]!
`

exports.Mutation = `
  addOrder(user: ID!, house: ID!, price: Float!, from: String!, to: String!, message: String, deposit: Float, deposit_received: Boolean, discount_rate: Int, confirm: Boolean): _result!

  updateOrder(_id: ID!, price: Float, from: String, to: String, message: String, deposit: Float, deposit_received: Boolean, discount_rate: Int, confirm: Boolean): _result!

  removeOrders(ids: [ID!]): [_result!]!
`
