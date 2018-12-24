import { House, Comment, User } from '../../mongo/models';
import { verifyUser, verifyOwner, verifyHouse, checkHouse} from '../../global/verify';
let [ query, mutation, resolvers ] =[{}, {}, {}];
import {createError} from '../errors';

resolvers._comment = {
  _id: ({_id}) => _id.toString(),
  relate_type: ({relate_type}) => relate_type,
  relate_id: ({relate_id}) => relate_id.toString(),
  from: async ({from}) => await User.findOne({query: {_id: from}}),
  comment: ({comment}) => comment,
  last_update_at: ({last_update_at}) => last_update_at,
  create_at: ({create_at}) => create_at,
}

// Query
query.getComment = async (root, args, context, schema) => {
  return await Comment.findOne({query: args});
}

//relate_type: String, relate_id: ID, from: ID
query.getComments = async (root, args, context, schema) => {
  return Comment.find({query: args});
}

// Mutation
//relate_type: String!, relate_id: ID!, rating: Int!, comment: String!
mutation.addComment = async (root, args, context, schema) => {
  // Verify User
  let user = await verifyUser({userId: context.user, customer: true});
  if (args.relate_type === 'House'){
    // Check House
    let house  = await checkHouse({_id: args.relate_id, deleted: false, select: {'publish': 1}});
    if (!house.publish) throw createError({message: 'house is unpublish'});
    
    return await Comment.save({data: Object.assign(args, {from: user._id})})
    .then((res) => {
      return {success: true};
    })
  }
  return {success: false};
}

//_id: ID!, rating: Int, comment: String
mutation.updateComment = async (root, args, context, schema) => {
  // Verify User
  let user = await verifyUser({userId: context.user, customer: true});
  const {_id} = args;
  delete args._id;
  return await Comment.findOneAndUpdate({query: {_id, from: user._id}, update: args, options: {runValidators: true}})
  .then((doc) => {
    if (!doc) throw createError({message: "Updating comment fail"});
    return {success: true};
  })
}

mutation.removeComments = async (root, args, context, schema) => {
  // Verify User
  let user = await verifyUser({userId: context.user, customer: true, admin: true});
  return await args.ids.map(async (_id) => {
    let query = {_id};
    if (user.role === "customer") query.from = user._id;
    return await Comment.deleteOne({query})
    .then((doc) => {
      if (doc.n == 0) return {success: false};
      return {success: true};
    })
  })
}

exports.resolvers = resolvers;
exports.query = query;
exports.mutation = mutation;
