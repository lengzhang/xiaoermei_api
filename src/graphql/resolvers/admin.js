import { Admin } from '../../mongo/models';
import { verifyUser, verifyOwner, verifyHouse, checkHouse} from '../../global/verify';
let [ query, mutation, resolvers ] =[{}, {}, {}];
import {createError} from '../errors';

resolvers._admin = {
  _id: ({_id}) => _id.toString(),
  deposit_rate: ({deposit_rate}) => deposit_rate,
  last_update_at: ({last_update_at}) => last_update_at,
  create_at: ({create_at}) => create_at,
}

// Query
query.getAdmin = async (root, args, context, schema) => {
  // Verify User
  let userInfo = await verifyUser({userId: context.user, admin: true});
  return await Admin.findOne({query: {}});
}

// Mutation
mutation.updateAdmin = async (root, args, context, schema) => {
  // Verify User
  let userInfo = await verifyUser({userId: context.user, admin: true});
  if (Object.keys(args).length > 0) args.last_update_at = Date.now();
  return await Admin.findOneAndUpdate(({
    query: {},
    update: args,
    options: {runValidators: true}
  })).then((doc) => {return {success: true}})
}

exports.resolvers = resolvers;
exports.query = query;
exports.mutation = mutation;
