import {WeappUser, User} from '../../mongo/models'
let [ query, mutation, resolvers ] =[{}, {}, {}];
import config from '../../../config';
import CryptData from '../../global/crypt-data';
import WeVerify from '../../global/we-verify';

import JWT from '../../global/jwt';
import {createError} from '../errors';
import {jwt_expires} from '../../../config';

// Resolvers
resolvers._weapp_user = {
  _id: ({_id}) => _id.toString(),
  open_id: ({open_id}) => open_id,
  user: async ({user}) => {
    return await User.findOne({query: {_id: user}});
  },
  last_login_at: ({last_login_at}) => last_login_at,
  create_at: ({create_at}) => create_at,
}

resolvers.weappLoginResult = {
  access_token: ({access_token}) => access_token,
  success: ({success}) => success,
}

// Query
query.getWeappUser = async (root, args, context, schema) => {
  // for (let v in args) {
  //   console.log(`[${v}]\t`, args[`${v}`]);
  // }
  return await WeappUser.findOne({query: args});
}

query.getWeappUsers = async (root, args, context, schema) => {
  // for (let v in args) {
  //   console.log(`[${v}]\t`, args[`${v}`]);
  // }
  return await WeappUser.find({query: args});
}

// Mutation
//code: String!, rawData: String, signature: String, encryptedData: String, iv: String
mutation.weappLogin = async (root, args, context, schema) => {
  // for (let v in args) {
  //   console.log(`[${v}]\t`, args[`${v}`]);
  // }

  // WeAPP Verification
  const wv = new WeVerify(config.app_id, config.app_secret);
  const {openid, session_key} = await wv.getSectionKey(args.code);

  const cd = new CryptData(config.app_id, session_key);
  // Verify Signature
  if (args.signature != await cd.encryptSha1(args.rawData)) throw createError(({message: 'signature verify fail'}));

  // Decode encryptedData
  const decoded = await cd.decryptData(args.encryptedData, args.iv);
  // Verify OpenId
  if (openid != decoded.openId) throw createError(({message: 'openId verify fail'}))

  console.log('decoded:');
  for (let v in decoded) {
    console.log(`[${v}]\t`, decoded[`${v}`]);
  }

  // Verify AppId
  if (config.app_id != decoded.watermark.appid) {
    throw createError(({
      message: 'tappid verify fail',
      code: 'VerifyError',
    }))
  }
  // Find WeappUser by openid
  // let res = await WeappUser.findOne({query: {open_id: openid}});
  // const skey = await cd.encryptSha1();
  return await WeappUser.findOne({query: {open_id: openid}})
  .then(async (doc) => {
    console.log("doc", doc);
    // user information exist, then update
    let res, now = Date.now();
    if (doc) {
      console.log("exist");
      // Update User
      res = await User.updateOne({
        query: {_id: doc.user},
        update: {
          nickname: decoded.nickName,
          nickname_reset_at: now,
          avatar: decoded.avatarUrl,
          gender: decoded.gender,
          country: decoded.country,
          province: decoded.province,
          city: decoded.city,
          last_login_at: now,
        },
        options: {runValidators: true}
      }).then(async (user) => {
        // Update WeappUser
        return await WeappUser.findOneAndUpdate({
          query: {_id: doc._id, open_id: decoded.openId, user: doc.user},
          update: {last_login_at: now},
          options: {runValidators: true}
        })
      });
    }
    // user information does not exist, then create
    else {
      // Create User
      res = await User.save({data: {
          nickname: decoded.nickName,
          role: 'customer',
          avatar: decoded.avatarUrl,
          gender: decoded.gender,
          country: decoded.country,
          province: decoded.province,
          city: decoded.city,
      }}).then(async (user) => {
        // Create WeappUser
        return await WeappUser.save({
          data: {open_id: decoded.openId, user: user._id}
        });
      })
    }
    // Generate access token
    let {access_token} = await JWT.encode({
      secretKey: context.jwtTokenSecret,
      userId: res.user,
      ip: context.ip,
      expires: jwt_expires,
    });
    return {access_token, success: true};
  })
}

exports.resolvers = resolvers;
exports.query = query;
exports.mutation = mutation;
