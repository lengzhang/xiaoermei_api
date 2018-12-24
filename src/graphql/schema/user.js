exports.Schema = `
  type _user {
    _id: ID
    nickname: String
    nickname_reset_at: String
    create_at: String
    last_login_at: String
    role: String
    avatar: String
    gender: Int
    brief: String
    country: String
    province: String
    city: String
    house_count: Int
    comment_count: Int
    follow_house: [_house]!
    follow_house_count: Int
    email: _email
    phone: _phone
  }

  type _email {
    _id: ID
    user: _user
    email: String
    create_at: String
  }

  type _phone {
    _id: ID
    user: _user
    country_code: String
    phone: String
    create_at: String
  }
`

exports.Query = `
  getSelfInfo: _user
  getUser(_id: ID!): _user
  getUsers(role: String, gender: Int, country: String, province: String, city: String): [_user]!
`

exports.Mutation = `
  addLandlord(nickname: String!, gender: Int): _result!

  updateUserInfo(_id: ID, nickname: String, avatar: String, gender: Int, brief: String, country: String, province: String, city: String): _result!

  linkEmail(_id: ID, email: String!): _result!
  unlinkEmail(_id: ID): _result!
  linkPhone(_id: ID, country_code: String!, phone: String!): _result!
  unlinkPhone(_id: ID): _result!
`
