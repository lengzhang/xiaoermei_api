import {Account, User} from '../../mongo/models'
let [ query, mutation, resolvers ] =[{}, {}, {}];
import JWT from '../../global/jwt';
import {createError} from '../errors';
import {jwt_expires} from '../../../config';

// Resolvers
resolvers._account = {
  _id: ({_id}) => _id.toString(),
  username: ({username}) => username,
  password: ({password}) => password,
  user: async ({user}) => await User.findOne({query: {_id: user}}),
  create_at: ({create_at}) => create_at,
}

resolvers.token = {
  access_token: ({access_token}) => access_token,
}

// Query
query.getAccount = async (root, {_id}, context, info) => {
  return await Account.findOne({query: {_id}});
}

query.getAccounts = async (root, args, context, info) => {
  return await Account.find({query: args});
}

query.signIn = async (root, args, context, info) => {
  // for (let v in args) {
  //   console.log(`[${v}]\t`, args[`${v}`]);
  // }
  // console.log(context);

  // Verify User Name
  const accountInfo = await Account.findOne({
    query: {username: args.username},
    options: {
      lean: true,
      select: 'password user',
      populate: {
        path: 'user',
        select: {
          _id: 1,
          role: 1,
        }
      }
    }
  })
  .catch((err) => {throw createError({message: err})});
  if (!accountInfo) throw createError({message: 'Please check your username/password'});
  // console.log(accountInfo);

  // Verify Password
  if (!(await Account.verifyPassword({password: args.password, hashPassword: accountInfo.password}))) throw createError({message: 'Please check your username/password'});

  // Generate access token
  let {access_token} = await JWT.encode({
    secretKey: context.jwtTokenSecret,
    userId: accountInfo.user._id,
    ip: context.ip,
    expires: jwt_expires,
  });
  return {access_token, role: accountInfo.user.role}
}

// Mutation
mutation.signUp = async (root, args, context, info) => {
  // for (let v in args) {
  //   console.log(`[${v}]\t`, args[`${v}`]);
  // }
  if (args.role === 'landlord') return {success: false, message: "Cannot sigup for landlord"};
  if (await Account.findOne({query: {username: args.username}})) {
    throw createError({message: 'Username Exist'});
  }
  let {username, password} = args;
  delete args.username;
  delete args.password;

  return await User.save({data: args})
  .then(async (res) => {
    // Generate Hash Password
    let hash = await Account.getHashPassword({password})
    .catch(async (err) => {
      await User.deleteOne({query: {_id: res._id}});
      throw err
    });
    let accountInfo = {
      username: username,
      password: hash,
      user: res._id,
    }
    // console.log("accountInfo", accountInfo);
    return await Account.save({data: accountInfo})
    .then((res) => {
      return {success: true};
    })
    .catch(async (err) => {
      await User.deleteOne({query: {_id: res._id}})
      throw err;
    })
  })
  .catch((err) => {throw err;})
}

mutation.updatePassword = async (root, args, context, info) => {
  // for (let v in args) {
  //   console.log(`[${v}]\t`, args[`${v}`]);
  // }
  // console.log(context);
  if (!context.user)  throw createError({message: 'Access token is required'});
  let account = await Account.findOne({query: {user: context.user}})
  .catch((err) => {throw err});

  // Verify Old Password
  if (!(await Account.verifyPassword({password: args.oldPassword, hashPassword: account.password}))) throw createError({message: 'Old password is incorrect'});

  // Verify New Password
  if (args.password === args.oldPassword) throw createError({message: 'Your new password must be different'});

  // Generate Hash Password
  let hash = await Account.getHashPassword({password: args.password})
  .catch((err) => {throw err});

  // Update Password
  return await Account.updateOne({query: {user: context.user}, update: {password: hash}, options: {runValidators: true}})
  .then((res) => {return {success: true};})
  .catch((err) => {throw err});
}

exports.resolvers = resolvers;
exports.query = query;
exports.mutation = mutation;
