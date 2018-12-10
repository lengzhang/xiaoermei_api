import jwt from 'jsonwebtoken';
import {Token} from '../mongo/models'

exports.encode = async ({secretKey, userId, ip, expires = 60, options = {}}) => {
  expires = new Date().getTime() + expires * 1000;

  let token = await jwt.sign({
    user: userId,
    // expires,
    // options
  }, secretKey);

  // Clean token record
  await Token.deleteMany({query: {user: userId, ip}})
  .catch((err) => {throw err});
  // Save token record
  await Token.save({data: {user: userId, token, ip, expires}})
  .catch((err) => {throw err});

  return {
    user_id: userId,
    access_token: token,
    expires
  }
}

exports.decode = async ({token, secretKey}) => {
  try {
    // Check token record
    if (!(await Token.findOne({query:{token}}))) throw 'Token not found'
    // Decode token
    return await jwt.verify(token, secretKey);
  } catch(err) {
    console.log(`<decode error>\t${err}`);
    return null;
  }
}
