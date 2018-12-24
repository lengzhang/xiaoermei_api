import { House, User } from '../mongo/models';
import {createError} from '../graphql/errors';

/**
 *  Verify User
 *  @param  {Object}  Object
 *  @param  {String}  userId    - the user id
 *  @param  {Boolean} customer  - verify is customer or not
 *  @param  {Boolean} landlord  - verify is landlord or not
 *  @param  {Boolean} admin     - verify is admin or not
 *  @param  {Object}  select    - selection for the field of user information
 *  @return {Object}            - user information
 */
exports.verifyUser = async ({userId, customer = false, landlord = false, admin = false, select = {}}) => {
  // Check access token
  if (!userId) throw createError({message: 'user id is required'});
  // Check user role
  return await User.findOne({query: {_id: userId}, select: Object.assign(select, {'_id': 1, 'role': 1})})
  .then(async (user) => {
    // console.log("user", user);
    if (!user) throw createError({message: 'user does not exist'});
    else if (!customer && user.role === 'customer') throw createError({message: 'user role cannot be customer'});
    else if (!landlord && user.role === 'landlord') throw createError({message: 'user role cannot be landlord'});
    else if (!admin && user.role === 'admin') throw createError({message: 'user role cannot be admin'});
    return user;
  })
}

/**
 *  Verify Owner
 *  @param  {Object}  Object
 *  @param  {String}  userId    - the user id
 *  @param  {Boolean} ownerId   - the user id of owner
 *  @param  {Object}  select    - selection for the field of user information
 *  @return {Object}            - owner user information
 */
exports.verifyOwner = async ({userId, ownerId, select = {}}) => {
  let user = await User.findOne({query: {_id: userId}, select: {'_id': 1, 'role': 1}});
  // Check user role
  if (user.role === 'admin' && !ownerId) throw createError({message: 'owner id is required'});
  else if (user.role === 'landlord') ownerId = userId;
  // Verify owner
  return await User.findOne({query: {_id: ownerId}, select: Object.assign(select, {'_id': 1, 'role': 1})})
  .then((owner) => {
    console.log("owner", owner);
    if (!owner || owner.role != 'landlord') throw createError({message: 'owner verification fail'});
    return owner;
  })
}

/**
 *  Verify House
 *  @param  {Object}  Object
 *  @param  {String}  userId    - the user id
 *  @param  {Boolean} houseId   - the house id
 *  @param  {Object}  select    - selection for the field of house information
 *  @return {Object}            - house information
 */
exports.verifyHouse = async ({userId, houseId, select = {}}) => {
  let user = await User.findOne({query: {_id: userId}, select: {'_id': 1, 'role': 1}})
  // Verify House
  return await House.findOne({query: {_id: houseId}, select: Object.assign(select, {'_id': 1, 'owner': 1, 'deleted': 1})})
  .then((house) => {
    if (!house) throw createError({message: 'house does not exist'});
    else if (user.role === 'landlord' && user._id.toString() != house.owner.toString()) throw createError({message: 'You do not have permission'});
    else if (house.deleted) throw createError({message: 'House already been deleted'});
    return house;
  })
}

exports.checkHouse = async ({_id, deleted = false, select = {}}) => {
  return await House.findOne({query: {_id}, select: Object.assign(select, {'_id': 1, 'deleted': 1, 'publish': 1})})
  .then((house) => {
    if (!house) throw createError({message: 'house does not exist'});
    else if (deleted != house.deleted) throw createError({message: 'check house deleted fail'});
    return house;
  })
}
