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
  getUser(_id: String!): _user
  getUsers(role: String, gender: Int, country: String, province: String, city: String): [_user]!
`

exports.Mutation = `
  updateUserInfo(nickname: String, avatar: String, gender: Int, brief: String, country: String, province: String, city: String): Boolean!

  linkEmail(email: String!): Boolean!
  unlinkEmail: Boolean!
  linkPhone(country_code: String!, phone: String!): Boolean!
  unlinkPhone: Boolean!
`
