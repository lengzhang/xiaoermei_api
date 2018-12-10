import {AdminUser, User} from '../../mongo/models'
let [ query, mutation, resolvers ] =[{}, {}, {}];
import JWT from '../../global/jwt';
import {createError} from '../errors';
import {jwt_expires} from '../../../config';

// Resolvers
resolvers._admin_user = {
  _id: ({_id}) => _id.toString(),
  username: ({username}) => username,
  password: ({password}) => password,
  user: ({user}) => user,
  create_at: ({create_at}) => create_at,
}

resolvers.tokenResult = {
  access_token: ({access_token}) => access_token,
  expires: ({expires}) => expires,
}

// Query
query.getAdminUser = async (root, {_id}, context, info) => {
  return await AdminUser.findOne({query: {_id}, options: {populate: {path: 'user'}}});
}

query.getAdminUsers = async (root, args, context, info) => {
  return await AdminUser.find({query: {}, options: {populate: {path: 'user'}}});
}

query.adminLogin = async (root, args, context, info) => {
  // for (let v in args) {
  //   console.log(`[${v}]\t`, args[`${v}`]);
  // }
  // console.log(context);

  // Verify User Name
  const accountInfo = await AdminUser.findOne({
    query: {username: args.username},
    options: {
      lean: true,
      select: 'password user',
      populate: {
        path: 'user',
        select: '_id'
      }
    }
  })
  .catch((err) => {throw createError({message: err})});
  if (!accountInfo) throw createError({message: 'Please check your username/password'});
  // console.log(accountInfo);

  // Verify Password
  if (!(await AdminUser.verifyPassword({password: args.password, hashPassword: accountInfo.password}))) throw createError({message: 'Please check your username/password'});

  // Generate access token
  return await JWT.encode({
    secretKey: context.jwtTokenSecret,
    userId: accountInfo.user._id,
    ip: context.ip,
    expires: jwt_expires,
  })
}

// Mutation
mutation.adminRegister = async (root, args, context, info) => {
  // for (let v in args) {
  //   console.log(`[${v}]\t`, args[`${v}`]);
  // }
  if (!await AdminUser.findOne({query: {username: args.username}})) {
    return await User.save({data: {
      nickname: args.nickname,
      role: "admin",
      gender: args.gender,
      avatar: args.avatar,
      brief: args.brief,
      country: args.country,
      province: args.province,
      city: args.city,
    }})
    .then(async (res) => {
      let hash = await AdminUser.getHashPassword({password: args.password})
      .catch((err) => {throw err});
      let accountInfo = {
        username: args.username,
        password: hash,
        user: res._id,
      }
      // console.log("accountInfo", accountInfo);
      return await AdminUser.save({data: accountInfo})
      .then((res) => {
        return true;
      })
      .catch(async (err) => {
        await User.remove({query: {_id: res._id}})
        return err;
      })
    })
    .catch((err) => {
      throw err;
    })
  }
  else {
    return false;
  }
}

exports.resolvers = resolvers;
exports.query = query;
exports.mutation = mutation;
