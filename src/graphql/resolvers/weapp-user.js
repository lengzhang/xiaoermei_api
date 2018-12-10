import {WeappUser, User} from '../../mongo/models'
let [ query, mutation, resolvers ] =[{}, {}, {}];
import config from '../../../config';
import CryptData from '../../global/crypt-data';
import WeVerify from '../../global/we-verify';

import {createUserInputError, createError} from '../errors';

// Resolvers
resolvers._weapp_user = {
  _id: ({_id}) => _id.toString(),
  open_id: ({open_id}) => open_id,
  user: async ({user}) => {
    return await User.findOne({query: {_id: user}});
  },
  skey: ({skey}) => skey,
  create_at: ({create_at}) => create_at,
}

resolvers.weappLoginResult = {
  skey: ({skey}) => skey,
  success: ({success}) => success,
}

// Query
query.getWeappUsers = async (root, args, context, schema) => {
  // for (let v in args) {
  //   console.log(`[${v}]\t`, args[`${v}`]);
  // }
  return await WeappUser.find({query: args});
}

query.getWeappUser = async (root, args, context, schema) => {
  // for (let v in args) {
  //   console.log(`[${v}]\t`, args[`${v}`]);
  // }
  if (!args._id && !args.open_id && !args.skey) {
    throw createUserInputError({message: 'Specify _id or open_id or skey'});
  }
  return await WeappUser.findOne({query: args});
}

// Mutation
mutation.weappLogin = async (root, args, context, schema) => {
  // for (let v in args) {
  //   console.log(`[${v}]\t`, args[`${v}`]);
  // }

  const wv = new WeVerify(config.app_id, config.app_secret);
  const {openid, session_key} = await wv.getSectionKey(args.code);

  const cd = new CryptData(config.app_id, session_key);

  // Verify Signature
  if (args.signature != await cd.encryptSha1(args.rawData)) {
    throw createError(({
      message: 'signature verify fail',
      code: 'VerifyError',
    }))
  }

  // Decode encryptedData
  const decoded = await cd.decryptData(args.encryptedData, args.iv);
  // Verify OpenId
  if (openid != decoded.openId) {
    throw createError(({
      message: 'openId verify fail',
      code: 'VerifyError',
    }))
  }

  console.log('decoded:\n');
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
  let res = await WeappUser.findOne({query: {open_id: openid}});
  const skey = await cd.encryptSha1();

  try {
    if (res) {
      // user info exist, update user info
      let weappId = res._id, userId = res.user, now = Date.now();
      return await WeappUser.updateOne({
        query: {_id: weappId},
        update: {
          open_id: openid,
          skey,
          last_login_at: now,
        }
      })
      .then(async (res) => {
        return await User.updateOne({
          query: {_id: userId},
          update: {
            nickname: decoded.nickName,
            nickname_reset_at: now,
            avatar: decoded.avatarUrl,
            gender: decoded.gender,
            country: decoded.country,
            province: decoded.province,
            city: decoded.city,
            last_login_at: now,
          }
        })
        .then((res) => {
          return {
            skey,
            success: true,
          }
        })
        .catch((err) => {
          console.log('User.updateOne in weappLogin fail');
          throw err
        })
      })
      .catch((err) => {
        console.log('WeappUser.updateOne in weappLogin fail');
        throw err
      })
    }
    else {
      // user info not exist, register user
      return await User.save({
        data: {
          nickname: decoded.nickName,
          role: 'customer',
          avatar: decoded.avatarUrl,
          gender: decoded.gender,
          country: decoded.country,
          province: decoded.province,
          city: decoded.city,
        }
      })
      .then(async (res) => {
        return await WeappUser.save({
          data: {
            open_id: decoded.openId,
            user: res._id,
            skey,
          }
        }).then((res) => {
          return {
            skey,
            success: true,
          }
        })
        .catch((err) => {
          console.log('WeappUser.save in weappLogin fail');
          throw err
        })
      })
      .catch(err => {
        console.log('User.save in weappLogin fail');
        throw err
      })
    }
  }
  catch(err) {
    return {
      success: false,
    };
  }
}

exports.resolvers = resolvers;
exports.query = query;
exports.mutation = mutation;
