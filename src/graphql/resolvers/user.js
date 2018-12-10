import {User, Email, Phone, House} from '../../mongo/models'
let [ query, mutation, resolvers ] =[{}, {}, {}];
import {createError} from '../errors';

// Resolvers
resolvers._user = {
  _id: ({_id}) => _id.toString(),
  nickname: ({nickname}) => nickname,
  nickname_reset_at: ({nickname_reset_at}) => nickname_reset_at,
  create_at: ({create_at}) => create_at,
  last_login_at: ({last_login_at}) => last_login_at,
  role: ({role}) => role,
  avatar: ({avatar}) => avatar,
  gender: ({gender}) => gender,
  brief: ({brief}) => brief,
  country: ({country}) => country,
  province: ({province}) => province,
  city: ({city}) => city,
  house_count: ({house_count}) => house_count,
  comment_count: ({comment_count}) => comment_count,
  follow_house: async ({follow_house}) => await follow_house.map(async (_id) => await House.findOne({query: {_id}})),
  follow_house_count: ({follow_house_count}) => follow_house_count,
  email: async ({email}) => await Email.findOne({query: {_id: email}}),
  phone: async ({phone}) => await Phone.findOne({query: {_id: phone}}),
}

resolvers._email = {
  _id: ({_id}) => _id.toString(),
  user: async ({user}) => await User.findOne({query: {_id: user}}),
  email: ({email}) => email,
  create_at: ({create_at}) => create_at,
}

resolvers._phone = {
  _id: ({_id}) => _id.toString(),
  user: async ({user}) => await User.findOne({query: {_id: user}}),
  country_code: ({country_code}) => country_code,
  phone: ({phone}) => phone,
  create_at: ({create_at}) => create_at,
}

// Query
query.getUser = async (root, {_id}, context, info) => {
  return await User.findOne({query: {_id}});
}

query.getUsers = async (root, args, context, schema) => {
  return await User.find({query: args});
}

query.getSelfInfo = async (root, args, context, info) => {
  if (!context.user) throw createError({message: 'Access token is required'});
  return await User.findOne({query: {_id: context.user}});
}

// Mutation
mutation.updateUserInfo = async (root, args, context, info) => {
  let { user } = context;
  if (!user) throw createError({message: 'Access token is required'});
  // Minimise args
  let userInfo = await User.findOne({query: {_id: user}});
  for (let v in args) {
    if (args[`${v}`] === userInfo[`${v}`]) delete args[`${v}`];
  }
  if (args.nickname) args = await Object.assign({}, args, {nickname_reset_at: Date.now()})
  // Update user infomation
  return await User.updateOne({query: {_id: user}, update: args, options: {runValidators: true}})
  .then(async (res) => true)
  .catch((err) => {throw err})
};

mutation.linkEmail = async (root, args, context, info) => {
  let { user } = context;
  if (!user) throw createError({message: 'Access token is required'});
  let { email } = args;
  if (!email) throw createError({message: 'Email is required'});
  let userInfo = await User.findOne({query: {_id: user}});
  // Check user already linked an email
  if (userInfo.email) throw createError({message: 'User already linked an email.'});
  // Check the email already be linked
  if (await Email.findOne({query: {email}})) throw createError({message: 'The email is already linked.'});
  // Link Email
  return await Email.save({data: {user, email}})
  .then(async (doc) => {
    userInfo.email = doc._id;
    await userInfo.save()
    return true;
  })
};

mutation.unlinkEmail = async (root, args, context, info) => {
  let { user } = context;
  if (!user) throw createError({message: 'Access token is required'});
  let userInfo = await User.findOne({query: {_id: user}});
  // Check user already linked an email
  if (userInfo && !userInfo.email) throw createError({message: 'Account did not link an email address'});
  // Unlink email
  return await Email.deleteOne({query: {user}})
  .then(async (res) => {
    userInfo.email = null;
    await userInfo.save()
    return true;
  })
};

mutation.linkPhone = async (root, args, context, info) => {
  let { user } = context;
  if (!user) throw createError({message: 'Access token is required'});
  let { country_code, phone } = args;
  if (!country_code || !phone) throw createError({message: 'Country code and phone number are required'});
  let userInfo = await User.findOne({query: {_id: user}});
  // Check user already linked a phone number
  if (userInfo.country_code || userInfo.phone) throw createError({message: 'User already linked a phone number.'});
  // Check the phone number already be linked
  if (await Phone.findOne({query: {country_code, phone}})) throw createError({message: 'The phone number is already linked.'});
  // Link phone number
  return await Phone.save({data: {user, country_code, phone}})
  .then(async (doc) => {
    userInfo.phone = doc._id;
    await userInfo.save()
    return true;
  })
};

mutation.unlinkPhone = async (root, args, context, info) => {
  let { user } = context;
  if (!user) throw createError({message: 'Access token is required'});
  let userInfo = await User.findOne({query: {_id: user}});
  // Check user already linked a phone number
  if (userInfo && !userInfo.phone) throw createError({message: 'Account did not link a phone number'});
  // Unlink phone number
  return await Phone.deleteOne({query: {user}})
  .then(async (res) => {
    userInfo.phone = null;
    await userInfo.save()
    return true;
  })
};

exports.resolvers = resolvers;
exports.query = query;
exports.mutation = mutation;
