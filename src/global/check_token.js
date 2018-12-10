import JWT from './jwt';
import {User, Token} from '../mongo/models';
import config from '../../config';

export default async ({token, secretKey}) => {
  // Decode token
  // console.log("token", token);
  let decoded = await JWT.decode({token, secretKey});
  if (!decoded) return null;
  // console.log("decoded", decoded);

  // Check token available
  let tokenResult = await Token.findOne({
    query: {user: decoded.user, token},
    select: {},
    options: {
      populate: {
        path: 'user'
      }
    }
  })
  .catch((err)=> {throw err});

  // console.log("tokenResult", tokenResult);
  // Check token expire
  let now = new Date().getTime();
  if (tokenResult.expires < now) return null;
  // console.log('not expire', Date(tokenResult.expires), now, tokenResult.expires - now);

  // Update last login time every 5 minutes
  if (now - new Date(tokenResult.user.last_login_at).getTime() > 1000 * 60 * 5) {
    await User.updateOne({
      query: {_id: tokenResult.user._id},
      update: {last_login_at: now},
    })
    .catch((err) => {throw err});
  }

  // Update token expires
  await Token.updateOne({
    query: {user: tokenResult.user._id, token},
    update: {expires: now + config.jwt_expires * 1000},
  })
  .catch((err) => {throw err});

  return tokenResult.user._id;
}
